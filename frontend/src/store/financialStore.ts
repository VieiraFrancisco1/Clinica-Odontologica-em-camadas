import { create } from 'zustand';
import { FinancialTransaction } from '../types';

interface FinancialState {
  transactions: FinancialTransaction[];
  loading: boolean;
  error: string | null;
  setTransactions: (transactions: FinancialTransaction[]) => void;
  addTransaction: (transaction: FinancialTransaction) => void;
  updateTransaction: (transaction: FinancialTransaction) => void;
  removeTransaction: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useFinancialStore = create<FinancialState>((set) => ({
  transactions: [],
  loading: false,
  error: null,

  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
  updateTransaction: (transaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === transaction.id ? transaction : t
      ),
    })),
  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
