# Generated by Django 3.2.13 on 2022-09-21 13:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_alter_student_cgpa'),
        ('splManager', '0004_auto_20220920_1517'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='mentors',
        ),
        migrations.AddField(
            model_name='team',
            name='mentors',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='team_mentor', to='users.teacher'),
        ),
    ]
