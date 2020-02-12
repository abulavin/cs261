from django.urls import path

from . import views

urlpatterns = [
    path('trades/', views.ListCreateDerivataveTrade.as_view()),    
    path('trades/<trade_id>/', views.RetrieveUpdateDestroyDerivataveTrade.as_view()),    
    path('reports/', views.RetriveReports.as_view()),
    path('reports/generate/', views.generate_report),
]