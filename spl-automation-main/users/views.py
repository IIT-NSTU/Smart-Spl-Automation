from rest_framework import viewsets, filters, generics, mixins, status
from rest_framework.authentication import TokenAuthentication

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.settings import api_settings
from rest_framework.views import APIView

from users import models, serializers, permissions
from rest_framework.response import Response


# Create your views here.


class TeacherCreateView(generics.CreateAPIView):
    serializer_class = serializers.TeacherSerializer
    authentication_classes = (TokenAuthentication,)


class TeacherListView(generics.ListAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = serializers.TeacherListSerializers


class TeacherRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    lookup_field = 'username'
    queryset = models.UserProfile.objects.filter(is_teacher=True)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    serializer_class = serializers.TeacherRetrieveUpdateSerializers


class StudentCreateView(generics.CreateAPIView):
    serializer_class = serializers.StudentSerializer
    authentication_classes = (TokenAuthentication,)


class StudentListView(generics.ListAPIView):
    queryset = models.Student.objects.all()
    serializer_class = serializers.StudentListSerializers


class StudentRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    lookup_field = 'username'
    queryset = models.UserProfile.objects.filter(is_student=True)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    serializer_class = serializers.StudentRetrieveUpdateSerializers


class UserLoginApiView(ObtainAuthToken):
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({'token': token.key,'username' : user.username, 'is_teacher' : user.is_teacher ,'is_student' : user.is_student,'email': user.email, 'is_verified': user.is_verified})


class varifyOTP(APIView):

    def post(self, request):
        data = request.data
        serializer = serializers.VerifyEmailSerializer(data=data)
        if serializer.is_valid():
            email = serializer.data['email']
            otp = serializer.data['otp']
            user = models.UserProfile.objects.filter(email__iexact=email)
            if user.count() == 0:
                return Response({'message': "Email is not registered"}, status=status.HTTP_400_BAD_REQUEST)
            user = models.UserProfile.objects.get(email__iexact=email)
            if user.otp != otp:
                return Response({'message': "Wrong OTP "}, status=status.HTTP_400_BAD_REQUEST)
            user.is_verified = True
            user.save()
            return Response({'message': "Email verified successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)