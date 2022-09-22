from rest_framework import serializers
from .utils import unique_spl_join_code
from . import models


class TaskSerializer(serializers.ModelSerializer):
    assign = serializers.SerializerMethodField()

    class Meta:
        model = models.Task
        fields = ['id', 'project', 'assign', 'name', 'status', 'priority', 'description']

    def get_assign(self, obj):
        result = []
        for i in obj.assign.all():
            x = {}
            x['username'] = i.user_profile.username
            x['first_name'] = i.user_profile.first_name
            x['last_name'] = i.user_profile.last_name
            result.append(x)

        return result


class SplSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Spl
        fields = ['title', 'description', 'join_code', 'students', 'mentors']
        depth = 2

        extra_kwargs = {
            'join_code': {
                'read_only': True,
            },
        }

    def create(self, validated_data):
        """Handle creating user account"""
        spl = models.Spl(**validated_data)
        spl.join_code = unique_spl_join_code()
        spl.save()

        return spl


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Team
        fields = ['id', 'name', 'students', 'mentors', 'spl_code']


class ProjectSerializer(serializers.ModelSerializer):
    team = serializers.CharField(max_length=150, allow_null=False)

    class Meta:
        model = models.Project
        fields = ['id', 'title', 'description', 'team', 'spl_code']

    def create(self, validated_data):
        """Handle creating user account"""
        team_pk = validated_data.pop('team')
        team = models.Team.objects.get(pk=team_pk)
        project = models.Project(**validated_data)
        project.team = team
        project.save()
        return project

    def validate(self, data):
        # do your validation
        spl_code = data['spl_code'].upper()
        spl = models.Spl.objects.filter(join_code__iexact=spl_code)
        if not spl.exists():
            raise serializers.ValidationError({"spl_code": "SPL with this code is invalid"})

        team_pk = data['team']
        if not team_pk.isnumeric():
            raise serializers.ValidationError('team is invalid')
        team = models.Team.objects.filter(id=team_pk)
        if not team.exists():
            raise serializers.ValidationError('team is not exists')
        #####create a spl join code field in team
        team.spl_code = spl_code

    # def validate_team(self, value):
    #     if not value.isnumeric():
    #         raise serializers.ValidationError('team is invalid')
    #     team = models.Team.objects.filter(id=value)
    #     if not team.exists():
    #         raise serializers.ValidationError('team is invalid')
    #
    #     """have to check whether the team is associated with target spl or not"""
    #     # if team.project.
    #     data = self.get_initial()
    #     spl_code = self.validate_spl_code(data['spl_code'])
    #     print(spl_code)
    #     return value
    #
    # def validate_spl_code(self, value):
    #     value = value.upper()
    #     spl = models.Spl.objects.filter(join_code__iexact=value)
    #     if not spl.exists():
    #         raise serializers.ValidationError('join code is invalid')
    #     return value
