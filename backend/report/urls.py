from django.urls import path

from . import views

urlpatterns = [
    path('', views.RetriveReports.as_view()),
    path('generate/', views.generate_report),
]