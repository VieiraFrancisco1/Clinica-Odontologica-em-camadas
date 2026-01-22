import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'clinica_odonto.settings')
django.setup()

from django.contrib.auth.models import User
from clinic.models import Profile

# Criar usuário admin automaticamente
if not User.objects.filter(username='admin').exists():
    user = User.objects.create_user(
        username='admin',
        email='admin@clinic.com',
        password='admin123',
        first_name='Admin',
        last_name='User',
        is_staff=True,
        is_superuser=True
    )
    Profile.objects.create(user=user, role='administrador')
    print("✅ Usuário admin criado com sucesso!")
    print("   Usuário: admin")
    print("   Senha: admin123")
else:
    print("⚠️ Usuário admin já existe!")

# Criar dentista de teste
if not User.objects.filter(username='dentista1').exists():
    user2 = User.objects.create_user(
        username='dentista1',
        email='dentista@clinic.com',
        password='123456',
        first_name='Dr. João',
        last_name='Silva'
    )
    Profile.objects.create(user=user2, role='dentista')
    print("✅ Usuário dentista1 criado com sucesso!")
    print("   Usuário: dentista1")
    print("   Senha: 123456")
else:
    print("⚠️ Usuário dentista1 já existe!")

# Criar secretária de teste
if not User.objects.filter(username='secretaria1').exists():
    user3 = User.objects.create_user(
        username='secretaria1',
        email='secretaria@clinic.com',
        password='123456',
        first_name='Maria',
        last_name='Silva'
    )
    Profile.objects.create(user=user3, role='secretaria')
    print("✅ Usuário secretaria1 criado com sucesso!")
    print("   Usuário: secretaria1")
    print("   Senha: 123456")
else:
    print("⚠️ Usuário secretaria1 já existe!")
