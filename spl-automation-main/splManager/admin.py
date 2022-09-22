from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Spl)
admin.site.register(models.Project)
admin.site.register(models.Team)
admin.site.register(models.Task)