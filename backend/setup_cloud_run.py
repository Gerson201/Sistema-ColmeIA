#!/usr/bin/env python
import os
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
    django.setup()
    
    # Executar migrações
    execute_from_command_line(['manage.py', 'migrate'])
    
    # Criar superusuário se não existir
    from django.contrib.auth.models import User
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'Admin@12345')
        print("Superusuário 'admin' criado com sucesso!")
    else:
        print("Superusuário 'admin' já existe!")
