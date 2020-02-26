from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListCreateDerivativeTrade.as_view()),    
    path('<trade_id>/', views.RetrieveUpdateDestroyDerivativeTrade.as_view()),    
]