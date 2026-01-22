# Frontend - Clínica Odontológica

Frontend React com TypeScript para o sistema de gestão de clínica odontológica.

## Tecnologias

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool e dev server
- **React Router** - Client-side routing
- **Zustand** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O frontend será disponibilizado em `http://localhost:5173`

## Build para Produção

```bash
npm run build
```

## Estrutura de Pastas

```
frontend/
├── src/
│   ├── api/           # Cliente HTTP e endpoints da API
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── store/         # Estado global (Zustand)
│   ├── App.tsx        # Componente raiz
│   ├── main.tsx       # Ponto de entrada
│   └── index.css      # Estilos globais
├── index.html         # HTML principal
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Funcionalidades Implementadas

### 1. Autenticação
- Login com JWT
- Persistência de token
- Proteção de rotas

### 2. Dashboard
- Resumo de estatísticas
- Últimas consultas
- Acesso rápido aos módulos

### 3. Pacientes
- Listar todos os pacientes
- Busca por nome ou CPF
- Cadastrar novo paciente
- Editar dados do paciente
- Deletar paciente

### 4. Consultas
- Listar todas as consultas
- Filtrar por status de pagamento
- Agendar nova consulta
- Atualizar status de pagamento
- Deletar consulta

### 5. Interface
- Design responsivo
- Componentes reutilizáveis
- Notificações toast
- Tratamento de erros

## Variáveis de Ambiente

Crie um arquivo `.env.local`:

```
VITE_API_URL=http://localhost:8000
```

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra o navegador em `http://localhost:5173`

4. Use as credenciais de teste:
   - Usuário: `admin`
   - Senha: `admin123`

## Integração com o Backend

O frontend se comunica com a API Django em `http://localhost:8000/api`. Certifique-se de que o backend está rodando antes de iniciar o frontend.

### Endpoints Esperados

- `POST /api/auth/login/` - Login
- `GET /api/auth/me/` - Perfil do usuário
- `GET/POST /api/patients/` - Pacientes
- `GET/POST /api/appointments/` - Consultas
- `GET/POST /api/medical-records/` - Prontuários

## Melhorias Futuras

- [ ] Autenticação com refresh token automático
- [ ] Pagination para listas
- [ ] Filters avançados
- [ ] Download de relatórios
- [ ] Sistema de permissões por role
- [ ] Agendamento visual (calendar)
- [ ] Testes unitários
- [ ] PWA (Progressive Web App)
