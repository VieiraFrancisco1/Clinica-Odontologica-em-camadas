// Tipos para usuários e autenticação
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Profile {
  user: User;
  role: 'secretaria' | 'dentista' | 'administrador';
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
  profile: Profile;
}

// Tipos para pacientes
export interface Patient {
  id: number;
  name: string;
  phone: string;
  address: string;
  birth_date: string;
  cpf: string;
  created_at: string;
  updated_at: string;
}

// Tipos para prontuários
export interface MedicalRecord {
  id: number;
  patient: Patient;
  record: string;
  created_at: string;
  updated_at: string;
}

// Tipos para consultas
export interface Appointment {
  id: number;
  patient: Patient;
  dentist: User;
  date: string;
  time: string;
  procedure: string;
  description?: string;
  status: 'agendado' | 'realizado' | 'cancelado';
  payment_status: 'pago' | 'pendente';
  amount: number;
  created_at: string;
  updated_at: string;
}

// Tipos para lançamentos financeiros
export interface FinancialTransaction {
  id: number;
  appointment?: Appointment;
  appointment_id?: number;
  transaction_type: 'receita' | 'despesa';
  description: string;
  amount: number;
  date: string;
  paid: boolean;
  created_at: string;
  updated_at: string;
}

// Tipos para requisições e respostas
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  detail: string;
  errors?: Record<string, string[]>;
}
