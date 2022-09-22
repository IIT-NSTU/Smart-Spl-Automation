from rest_framework import serializers
import random
from . import models
from .utils import send_otp_via_email, validate_student_email, validate_teacher_email, isfloat
from rest_framework.authtoken.models import Token


class TeacherSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(max_length=128, write_only=True, style={'input_type': 'password'})
    designation = serializers.CharField(max_length=50, write_only=True)
    token = serializers.SerializerMethodField()
    is_verified = serializers.SerializerMethodField()

    class Meta:
        model = models.UserProfile
        fields = ['username', 'first_name', 'last_name', 'email', 'designation', 'password', 'confirm_password',
                  'is_teacher',
                  'is_student', 'is_verified', 'token']

        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            },
            'is_student': {
                'read_only': True,
            },
            'is_teacher': {
                'read_only': True,
            },
        }

    def create(self, validated_data):
        """Handle creating user account"""
        password = validated_data.pop('password')
        validated_data.pop('confirm_password')

        designation = validated_data.pop('designation')
        email = validated_data.get('email')
        user = models.UserProfile(**validated_data)
        user.set_password(password)
        user.is_teacher = True
        otp = random.randint(10000000, 99999999)
        user.otp = otp
        user.save()

        send_otp_via_email(email, otp)

        models.Teacher.objects.create(user_profile=user, designation=designation)

        return user

    def validate_confirm_password(self, value):
        data = self.get_initial()
        password = data.get('password')
        confirm_password = value
        if password != confirm_password:
            raise serializers.ValidationError('Password and confirm Password not matched')
        return value

    def validate_email(self, value):
        """validating email for teacher account"""
        email = value.lower()
        if not validate_teacher_email(email=email):
            raise serializers.ValidationError('Please enter your teacher email address')

        if models.UserProfile.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError('User with this email already exist')
        return value

    def get_token(self, obj):
        token, created = Token.objects.get_or_create(user=obj)
        return str(token.key)

    def get_is_verified(self, obj):
        return obj.is_verified


class TeacherListSerializers(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    is_verified = serializers.SerializerMethodField()

    class Meta:
        model = models.Teacher
        fields = ['user_profile', 'username', 'first_name', 'last_name', 'email', 'designation', 'is_verified']

    def get_username(self, obj):
        return str(obj.user_profile.username)

    def get_first_name(self, obj):
        return str(obj.user_profile.first_name)

    def get_last_name(self, obj):
        return str(obj.user_profile.last_name)

    def get_email(self, obj):
        return str(obj.user_profile.email)

    def get_is_verified(self, obj):
        return str(obj.user_profile.is_verified)


class Teacher(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['designation']


class TeacherRetrieveUpdateSerializers(serializers.ModelSerializer):
    teacher_profile = Teacher()

    class Meta:
        model = models.UserProfile
        fields = ['teacher_profile', 'username', 'first_name', 'last_name', 'email', 'is_verified', ]
        read_only_fields = ['is_verified']

    def update(self, instance, validated_data):
        """Handle updating user account"""
        teacher_profile = validated_data.pop('teacher_profile')
        designation = teacher_profile['designation']
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        if instance.email.lower() != validated_data.get('email', instance.email).lower():
            otp = random.randint(10000000, 99999999)
            send_otp_via_email(email=validated_data.get('email', instance.email), otp=otp)
            instance.otp = otp
            instance.email = validated_data.get('email', instance.email)
            instance.is_verified = False
        instance.save()

        teacher = models.Teacher.objects.get(user_profile=instance.id)
        teacher.designation = designation
        teacher.save()

        return instance

    def validate_email(self, value):
        """validating email for teacher account"""
        email = value.lower()
        instance = self.instance
        if not validate_teacher_email(email=email):
            raise serializers.ValidationError('Please enter your teacher email address')

        user_email = instance.email.lower()
        email = value.lower()
        if user_email != email:
            if models.UserProfile.objects.filter(email__iexact=value).exists():
                raise serializers.ValidationError('User with this email is already exist')

        return value


############################################################################################################################

class StudentSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(max_length=128, write_only=True, style={'input_type': 'password'})
    roll = serializers.CharField(max_length=50, write_only=True)
    cgpa = serializers.CharField(max_length=50, write_only=True)
    token = serializers.SerializerMethodField()
    is_verified = serializers.SerializerMethodField()

    class Meta:
        model = models.UserProfile
        fields = ['username', 'first_name', 'last_name', 'email', 'roll', 'cgpa', 'password', 'confirm_password',
                  'is_teacher',
                  'is_student', 'token', 'is_verified']

        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            },
            'is_student': {
                'read_only': True,
            },
            'is_teacher': {
                'read_only': True,
            },
        }

    def get_token(self, obj):
        token, created = Token.objects.get_or_create(user=obj)
        return str(token.key)

    def get_is_verified(self, obj):
        return obj.is_verified

    def create(self, validated_data):
        """Handle creating user account"""
        password = validated_data.pop('password')
        validated_data.pop('confirm_password')
        roll = validated_data.pop('roll')
        cgpa = validated_data.pop('cgpa')
        email = validated_data.get('email')
        user = models.UserProfile(**validated_data)
        user.set_password(password)
        user.is_student = True
        user.save()
        otp = random.randint(10000000, 99999999)
        user.otp = otp
        user.save()

        send_otp_via_email(email, otp)
        models.Student.objects.create(user_profile=user, roll=roll, cgpa=cgpa)

        return user

    def validate_confirm_password(self, value):
        data = self.get_initial()
        password = data.get('password')
        confirm_password = value
        if password != confirm_password:
            raise serializers.ValidationError('Password and confirm Password not matched')
        return value

    def validate_cgpa(self, value):

        if not isfloat(value):
            raise serializers.ValidationError('Invalid cgpa !')
        cgpa = float(value)
        if cgpa > 4 or cgpa < 0:
            raise serializers.ValidationError('Invalid cgpa !')
        return value

    def validate_email(self, value):
        """validating email for teacher account"""
        email = value.lower()
        if not validate_student_email(email=email):
            raise serializers.ValidationError('Please enter your student email address')

        if models.UserProfile.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError('User with this email is already exist')
        return value


class StudentListSerializers(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    is_verified = serializers.SerializerMethodField()

    class Meta:
        model = models.Student
        fields = ['user_profile', 'username', 'first_name', 'last_name', 'email', 'roll', 'is_verified']

    def get_username(self, obj):
        return str(obj.user_profile.username)

    def get_first_name(self, obj):
        return str(obj.user_profile.first_name)

    def get_last_name(self, obj):
        return str(obj.user_profile.last_name)

    def get_email(self, obj):
        return str(obj.user_profile.email)

    def get_is_verified(self, obj):
        return str(obj.user_profile.is_verified)


class Student(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['roll']


class StudentSerializers(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = models.Student
        fields = ['user', 'roll', 'cgpa']

    def get_user(self, obj):
        res = {'firstname': obj.user_profile.first_name, 'lastname': obj.user_profile.last_name,'username' : obj.user_profile.username}
        return res


class TeacherSerializers(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = models.Teacher
        fields = ['user', 'designation', ]

    def get_user(self, obj):
        res = {'firstname': obj.user_profile.first_name, 'lastname': obj.user_profile.last_name, 'username' : obj.user_profile.username}
        return res


class StudentRetrieveUpdateSerializers(serializers.ModelSerializer):
    student_profile = Student()

    class Meta:
        model = models.UserProfile
        fields = ['student_profile', 'username', 'first_name', 'last_name', 'email', 'is_verified', ]
        read_only_fields = ['is_verified']

    def update(self, instance, validated_data):
        """Handle updating user account"""
        student_profile = validated_data.pop('student_profile')
        roll = student_profile['roll']

        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        if instance.email.lower() != validated_data.get('email', instance.email).lower():
            otp = random.randint(10000000, 99999999)
            send_otp_via_email(email=validated_data.get('email', instance.email), otp=otp)
            instance.otp = otp
            instance.email = validated_data.get('email', instance.email)
            instance.is_verified = False

        instance.save()

        student = models.Student.objects.get(user_profile=instance.id)
        student.roll = roll
        student.save()

        return instance

    def validate_email(self, value):
        """validating email for student account"""
        email = value.lower()
        instance = self.instance
        if not validate_student_email(email=email):
            raise serializers.ValidationError('Please enter your student email address')

        user_email = instance.email.lower()
        email = value.lower()
        if user_email != email:
            if models.UserProfile.objects.filter(email__iexact=value).exists():
                raise serializers.ValidationError('User with this email is already exist')

        return value


class VerifyEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(max_length=8, required=True)
