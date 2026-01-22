from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Patient, MedicalRecord, Appointment, FinancialTransaction

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'role']

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'name', 'phone', 'address', 'birth_date', 'cpf', 'created_at', 'updated_at']

class MedicalRecordSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)

    class Meta:
        model = MedicalRecord
        fields = ['id', 'patient', 'record', 'created_at', 'updated_at']

class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    dentist = UserSerializer(read_only=True)
    patient_id = serializers.IntegerField(write_only=True)
    dentist_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 'patient', 'patient_id', 'dentist', 'dentist_id',
            'date', 'time', 'procedure', 'description', 
            'status', 'payment_status', 'amount',
            'created_at', 'updated_at'
        ]

class FinancialTransactionSerializer(serializers.ModelSerializer):
    appointment = AppointmentSerializer(read_only=True)
    appointment_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = FinancialTransaction
        fields = [
            'id', 'appointment', 'appointment_id', 'transaction_type',
            'description', 'amount', 'date', 'paid',
            'created_at', 'updated_at'
        ]