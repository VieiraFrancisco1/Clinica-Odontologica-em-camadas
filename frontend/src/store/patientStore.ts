import { create } from 'zustand';

export interface Patient {
  id: number;
  name: string;
  phone: string;
  address: string;
  birth_date: string;
  cpf: string;
}

interface PatientState {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  setPatients: (patients: Patient[]) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  removePatient: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  loading: false,
  error: null,

  setPatients: (patients) => set({ patients }),
  addPatient: (patient) =>
    set((state) => ({ patients: [...state.patients, patient] })),
  updatePatient: (patient) =>
    set((state) => ({
      patients: state.patients.map((p) => (p.id === patient.id ? patient : p)),
    })),
  removePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((p) => p.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
