from django.db import models
from users.models import Student, Teacher


# Create your models here.


class Team(models.Model):
    name = models.CharField(max_length=20, null=True, blank=True)
    students = models.ManyToManyField(Student, related_name="team_students", null=True, blank=True)
    mentor = models.ForeignKey(Teacher, related_name="team_mentor", null=True, blank=True, on_delete=models.CASCADE, )
    spl_code = models.CharField(max_length=8, null=True, blank=True)

    def __str__(self):
        return str(self.name)


# user= User.objects.get(name=request.data['name'](
# student= Student.objects.get(name=request.data['name']
# student_team= Team.objects.get(name=request.data['name']
# project= project.objects.get(name=request.data['name']

class Project(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField()
    team = models.ForeignKey(Team, related_name="project", on_delete=models.CASCADE, null=True, blank=True)
    spl_code = models.CharField(max_length=8, null=True, blank=True)

    def __str__(self):
        return str(self.title)


class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    description = models.CharField(max_length=200, null=True, blank=True)
    assign = models.ManyToManyField(Student, related_name="task", null=True, blank=True)
    name = models.CharField(max_length=80)
    status = models.CharField(max_length=20)
    priority = models.CharField(max_length=20)

    def __str__(self):
        return str(self.name)


class Spl(models.Model):
    title = models.CharField(max_length=20, null=True,
                             blank=True)
    description = models.TextField(null=True,
                                   blank=True)
    join_code = models.CharField(max_length=8, null=True,
                                 blank=True)
    students = models.ManyToManyField(Student, related_name="spl_students", null=True, blank=True)
    mentors = models.ManyToManyField(Teacher, related_name="spl_mentors", null=True, blank=True)

    def __str__(self):
        return str(self.title)
