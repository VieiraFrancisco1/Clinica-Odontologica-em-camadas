FROM python:3.11-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código do projeto
COPY . .

# Criar diretório para mídia e static files
RUN mkdir -p /app/media /app/staticfiles

# Expor porta
EXPOSE 8000

# Comando padrão
CMD ["gunicorn", "clinica_odonto.wsgi:application", "--bind", "0.0.0.0:8000"]
