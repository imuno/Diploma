from django.shortcuts import render, redirect
from django.contrib import auth
from django.contrib.auth import authenticate
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.http import HttpResponse
#from accounts.forms import UserAdminCreationForm

def welcome(request):
    return render(request, 'lesson/welcome.html')
