from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'patients', views.PatientViewSet)
router.register(r'medical-records', views.MedicalRecordViewSet)
router.register(r'appointments', views.AppointmentViewSet)
router.register(r'financial-transactions', views.FinancialTransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', views.login_view, name='login'),
    path('auth/me/', views.me_view, name='me'),
    path('auth/refresh/', views.refresh_token_view, name='refresh'),
]
