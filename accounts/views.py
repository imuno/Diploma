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
from django.contrib.auth import authenticate
import re, json

# Create your views here.

@login_required(login_url = '/login')
def welcome(request):
    return render(request, 'diploma/welcome.html')


def login(request):
    if request.method=='POST':
        user = authenticate(username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            auth.login(request, user)
            return redirect('welcome')
        else:
            return render(request, 'diploma/login.html', {'error': 'Username or password is incorrect.'})
    else:
        return render(request, 'diploma/login.html')

def getstarted(request):
    if request.method=='POST':
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.get(username=request.POST['username'])
                return render(request, 'diploma/login.html', {'error': 'This username already exists.'})
            except:
                user = User.objects.create_user(username=request.POST['username'], password=request.POST['password1'], first_name=request.POST['first_name'], last_name=request.POST['last_name'])
                user.save()
                auth.login(request, user)
                return redirect('welcome')
        else:
            return render(request, 'diploma/getstarted.html', {'error': 'Passwords must match.'})
    else:
        return render(request, 'diploma/getstarted.html')

def comingsoon(request):
    return render(request, 'diploma/comingsoon.html')
