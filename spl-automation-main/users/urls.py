from django.urls import path
from . import views

app_name = 'users'


urlpatterns = [
    path('student/sign-up/',views.StudentCreateView.as_view(), name='student-sign-up'),
    path('student/list/',views.StudentListView.as_view(), name='student-list'),
    path('student/list/<username>/',views.StudentRetrieveUpdateView.as_view(), name='student-retrieve-update'),

    path('teacher/sign-up/',views.TeacherCreateView.as_view(), name='teacher-sign-up'),
    path('teacher/list/',views.TeacherListView.as_view(), name='teacher-list'),
    path('teacher/list/<username>/',views.TeacherRetrieveUpdateView.as_view(), name='teacher-retrieve-update'),
    path('login/', views.UserLoginApiView.as_view(), name='user-login'),
    path('verify-account/', views.varifyOTP.as_view(), name='verify-account'),

]
