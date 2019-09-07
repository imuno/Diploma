from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from . models import UserLesson, UserQuiz

from .forms import UserAdminCreationForm, UserAdminChangeForm

User = get_user_model()

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('username', 'is_admin', 'is_active')
    list_filter = ('is_admin', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name',)}), # required fields in ()
        ('Permissions', {'fields': ('is_admin', 'is_staff', 'is_active',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2')}
        ),
    )
    search_fields = ('username', 'first_name', 'last_name',)
    ordering = ('username',)
    filter_horizontal = ()


class UserLessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'student', )
    search_fields = ('title', 'student', )
    ordering = ('student',)
    filter_horizontal = ()

class UserQuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'student', )
    search_fields = ('title', 'student', )
    ordering = ('student',)
    filter_horizontal = ()

admin.site.register(User, UserAdmin)
# Remove Group Model from admin. We're not using it.
admin.site.unregister(Group)
admin.site.register(UserLesson, UserLessonAdmin)
admin.site.register(UserQuiz, UserQuizAdmin)
