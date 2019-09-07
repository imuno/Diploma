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
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.core import serializers
from accounts.forms import UserAdminChangeForm
from django.contrib.auth.forms import PasswordChangeForm
from accounts.models import User
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib import auth
import re, json
#from accounts.forms import UserAdminCreationForm

@login_required(login_url = '/login')
def welcome(request):
    return render(request, 'diploma/welcome.html')

def login(request):
    return render(request, 'diploma/login.html')
