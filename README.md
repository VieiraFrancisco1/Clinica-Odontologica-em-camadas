# Sistema Web para Gestão de Clínica Odontológica

## 1. Descrição Geral do Sistema

Este sistema web tem como objetivo auxiliar na gestão de uma clínica odontológica, permitindo o controle de usuários, pacientes, prontuários, consultas e informações financeiras básicas.

A aplicação é composta por um **front-end separado**, responsável pela interação com o usuário, e um **back-end**, responsável pelas regras de negócio, segurança e persistência dos dados.

---

## 2. Requisitos Funcionais

• Autenticação de usuários por login e senha;
• Cadastro de usuários com definição de perfil (Secretária, Dentista ou Administrador);
• **Cadastro, edição e remoção de pacientes** (nome, telefone, endereço, data de nascimento e CPF);
• Listagem e consulta de pacientes cadastrados;
• **Registro e consulta de prontuários por paciente**;
• **Agendamento, edição e cancelamento de consultas**, vinculando paciente, dentista, data, hora e procedimento;
• Controle do status financeiro da consulta (Pago ou Pendente);
• Visualização da agenda de consultas;
• **Lançamentos financeiros** (criar, listar, editar, excluir) com tipos receita/despesa;
• Controle de acesso aos módulos conforme o perfil do usuário.

---

## 3. Requisitos Não Funcionais

• Interface simples, intuitiva e de fácil navegação;
• Aplicação web acessível via navegador;
• Boa performance nas operações de cadastro e consulta;
• Segurança básica por autenticação e controle de permissões;
• Separação clara entre interface, regras de negócio e dados;
• Código organizado e de fácil manutenção.

---

## 4. Arquitetura do Sistema

O sistema adota a **Arquitetura em Camadas**, garantindo baixo acoplamento e alta coesão. Cada camada possui responsabilidades bem definidas e se comunica apenas com as camadas adjacentes.

### Camadas do Sistema

• **Camada de Apresentação (Front-end):** responsável pela interface gráfica e interação com o usuário;
• **Camada de Aplicação ou Negócio (Back-end):** responsável pelas regras de negócio, validações e autenticação;
• **Camada de Persistência de Dados:** responsável pelo armazenamento e recuperação das informações.

---

## 5. Justificativa da Adoção da Arquitetura em Camadas

A adoção da arquitetura em camadas foi escolhida para:

• Facilitar a manutenção e evolução do sistema;
• Permitir a reutilização de código;
• Separar responsabilidades, evitando acoplamento excessivo;
• Facilitar testes e futuras integrações;
• Atender às boas práticas de engenharia de software exigidas na disciplina.

---

## 6. Diagrama Simples da Arquitetura

```
[ Front-end ]
     |
     v
[ API REST - Back-end ]
     |
     v
[ Banco de Dados ]
```

---

## 7. Tecnologias Utilizadas

### Front-end

• **React 18** - Framework UI moderno
• **TypeScript** - Type safety
• **Vite** - Build tool rápido
• **Tailwind CSS** - Styling profissional
• **Zustand** - State management
• **Axios** - HTTP client
• **React Router** - Navegação
• **React Hot Toast** - Notificações

### Back-end

• **Python Django** - Framework web
• **Django REST Framework** - API REST
• **JWT** - Autenticação segura
• **Django CORS Headers** - CORS support

### Banco de Dados

• SQLite (desenvolvimento)
• PostgreSQL (produção recomendado)

### Versionamento

• Git e GitHub

---

## 8. Estrutura de Pastas

### Back-end

```
backend/
├── clinica_odonto/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
├── clinic/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   ├── views.py
│   └── migrations/
├── db.sqlite3
├── manage.py
└── requirements.txt
```

### Front-end

```
frontend/
├── src/
│   ├── api/
│   │   ├── axios.ts           # Cliente HTTP com interceptors
│   │   └── endpoints.ts       # Endpoints da API
│   ├── components/
│   │   ├── ui.tsx             # Componentes básicos (Button, Input, Card, Table, Badge)
│   │   ├── advanced.tsx       # Componentes avançados (Modal, Tabs, Alert, etc)
│   │   ├── Navbar.tsx         # Barra de navegação
│   │   └── ProtectedRoute.tsx # Proteção de rotas
│   ├── pages/
│   │   ├── LoginPage.tsx              # Autenticação JWT
│   │   ├── DashboardPage.tsx          # Dashboard com estatísticas
│   │   ├── PatientsPage.tsx           # Listagem de pacientes
│   │   ├── NewPatientPage.tsx         # Cadastro de paciente
│   │   ├── PatientDetailPage.tsx      # Detalhes + Prontuário
│   │   ├── AppointmentsPage.tsx       # Listagem de consultas
│   │   ├── NewAppointmentPage.tsx     # Agendamento de consulta
│   │   ├── FinancialPage.tsx          # Lançamentos financeiros
│   │   └── NewFinancialPage.tsx       # Nova transação financeira
│   ├── store/
│   │   ├── authStore.ts            # Autenticação (Zustand)
│   │   ├── patientStore.ts         # Pacientes (Zustand)
│   │   ├── appointmentStore.ts     # Consultas (Zustand)
│   │   └── financialStore.ts       # Transações Financeiras (Zustand)
│   ├── types/
│   │   └── index.ts                # Interfaces TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

---

## 9. Instruções para Execução do Projeto

### Back-end

1. Acesse a pasta `backend`;
2. Certifique-se de que Python 3.8+ está instalado;
3. Crie um virtual environment: `python -m venv venv`;
4. Ative: `venv\Scripts\activate` (Windows) ou `source venv/bin/activate` (Linux/Mac);
5. Execute `pip install -r requirements.txt`;
6. Execute `python manage.py migrate`;
7. Execute `python manage.py createsuperuser` (criar usuário admin);
8. Execute `python manage.py runserver` - servidor rodará em `http://localhost:8000`.

### Front-end

1. Acesse a pasta `frontend`;
2. Certifique-se de que Node.js 16+ e npm estão instalados;
3. Execute `npm install`;
5. Execute `npm run dev` para iniciar servidor de desenvolvimento;
6. Acesse `http://localhost:5173` no navegador.

### Executar Ambos (Recomendado)

**Terminal 1 (Backend):**
```bash
cd backend
python manage.py runserver
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Credenciais de Teste

- **Usuário:** admin
- **Senha:** admin123

### Build para Produção

**Frontend:**
```bash
cd frontend
npm run build
```

---

## 10. Docker - Execução com Containers

### Pré-requisitos
- Docker instalado ([Download Docker](https://www.docker.com/))
- Docker Compose (incluído com Docker Desktop)

### Iniciando com Docker

```bash
# Na raiz do projeto
docker-compose up --build
```

A aplicação estará disponível em:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **Admin Django:** http://localhost:8000/admin

### Comandos Úteis

```bash
# Parar os containers
docker-compose down

# Ver logs
docker-compose logs -f

# Executar migrate manualmente
docker-compose exec backend python manage.py migrate

# Criar superuser
docker-compose exec backend python manage.py createsuperuser

# Acessar shell do container backend
docker-compose exec backend bash
```

### Estrutura Docker

- **backend:** Django REST API
- **frontend:** React com Vite
- **Network:** clinica_network (comunicação entre containers)

---

## 11. Funcionalidades Implementadas

### ✅ Autenticação
- Login com JWT
- Logout seguro
- Proteção de rotas
- Persistência de sessão

### ✅ Gestão de Pacientes
- Listar todos os pacientes
- Busca por nome ou CPF
- Cadastrar novo paciente
- Visualizar detalhes
- Editar informações
- Deletar paciente
- Prontuário eletrônico

### ✅ Gestão de Consultas
- Listar todas as consultas
- Filtrar por status (agendado/realizado/cancelado)
- Agendar nova consulta
- Editar detalhes da consulta
- Cancelar consulta
- Alterar status de pagamento
- Associação paciente-dentista

### ✅ Gestão Financeira
- Lançar receitas e despesas
- Listar todas as transações
- Filtrar por tipo (receita/despesa)
- Filtrar por status de pagamento (pago/pendente)
- Editar transações
- Deletar transações
- Dashboard com resumo de saldos
- Cálculo automático de saldo total

### ✅ Dashboard
- Estatísticas em tempo real
- Total de pacientes
- Total de consultas
- Pendências financeiras
- Saldo geral
- Últimas consultas agendadas

### ✅ Interface
- Design responsivo (mobile, tablet, desktop)
- Componentes reutilizáveis
- Notificações toast
- Formulários validados
- Estados de carregamento
- Tratamento de erros
- Cards de resumo com cores indicativas

---

## 13. Identificação dos Autores

• Francisco de Asis vieira
