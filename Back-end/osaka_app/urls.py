"""this_is_osaka URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from osaka_app import views

urlpatterns = [
    path('question_list/', views.question_list),
    path('question_view/', views.qestion_view),
    path('question_create/', views.question_create),
    path('question_delete/', views.question_delete),
    path('in_region/', views.in_region),
    path('answer_q_list/', views.answer_q_list),
    path('answer_gpt/', views.answer_gpt),
    path('del_user/', views.del_user)
]
