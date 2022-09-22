from django.core.mail import send_mail
from django.conf import settings
import re

def send_otp_via_email(email, otp):
    subject = "your account verification email"
    message = f'your otp is {otp}'
    email_from = settings.EMAIL_HOST_USER
    send_mail(subject, message, email_from, [email],fail_silently=False,)

def validate_student_email(email):
    pattern = '([a-zA-Z0-9]+)([\.{1}|\_{1}])?([a-zA-Z0-9]+)\@(?:student)([\.])(?:nstu)([.])(?:edu)([\.])(?:bd)$'
    return re.match(pattern, email)

def validate_teacher_email(email):
    pattern = '([a-zA-Z0-9]+)([\.{1}|\_{1}])?([a-zA-Z0-9]+)\@(?:teacher)([\.])(?:nstu)([.])(?:edu)([\.])(?:bd)$'
    return re.match(pattern, email)

def isfloat(num):
    try:
        float(num)
        return True
    except ValueError:
        return False