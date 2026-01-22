import { create } from 'zustand';
import { Patient } from './patientStore';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Appointment {
  id: number;
  patient: Patient;
  dentist: User;
  date: string;
  time: string;
  procedure: string;
  status: 'pago' | 'pendente';
}

interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  setAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  removeAppointment: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: [],
  loading: false,
  error: null,

  setAppointments: (appointments) => set({ appointments }),
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),
  updateAppointment: (appointment) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === appointment.id ? appointment : a
      ),
    })),
  removeAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((a) => a.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
