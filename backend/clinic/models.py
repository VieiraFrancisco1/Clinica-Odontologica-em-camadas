from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=[
        ('secretaria', 'Secretária'),
        ('dentista', 'Dentista'),
        ('administrador', 'Administrador'),
    ])

    def __str__(self):
        return f"{self.user.username} - {self.role}"

class Patient(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    birth_date = models.DateField()
    cpf = models.CharField(max_length=14, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class MedicalRecord(models.Model):
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, related_name='medical_record')
    record = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Prontuário de {self.patient.name}"

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('agendado', 'Agendado'),
        ('realizado', 'Realizado'),
        ('cancelado', 'Cancelado'),
    ]
    
    PAYMENT_STATUS = [
        ('pago', 'Pago'),
        ('pendente', 'Pendente'),
    ]
    
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    dentist = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    date = models.DateField()
    time = models.TimeField()
    procedure = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='agendado')
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS, default='pendente')
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Consulta de {self.patient.name} com {self.dentist.username} em {self.date}"

class FinancialTransaction(models.Model):
    TRANSACTION_TYPE = [
        ('receita', 'Receita'),
        ('despesa', 'Despesa'),
    ]
    
    appointment = models.ForeignKey(Appointment, on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPE)
    description = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_transaction_type_display()} - {self.description}: R$ {self.amount}"

    class Meta:
        ordering = ['-date']
