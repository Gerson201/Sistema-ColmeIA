from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('data/', views.data_view, name='data'),
    path('history/', views.historical_data_view, name='history'),
]

