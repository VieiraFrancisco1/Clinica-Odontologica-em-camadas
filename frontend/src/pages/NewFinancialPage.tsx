import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { financialAPI } from '../api/endpoints';
import { useFinancialStore } from '../store/financialStore';
import { Card, Button, Input } from '../components/ui';
import toast from 'react-hot-toast';

export const NewFinancialPage: React.FC = () => {
  const navigate = useNavigate();
  const { addTransaction } = useFinancialStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    transaction_type: 'receita',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    paid: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await financialAPI.create({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      addTransaction(response.data);
      toast.success('Transação criada com sucesso!');
      navigate('/financial');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Erro ao criar transação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nova Transação</h1>

        <Card>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <select
                name="transaction_type"
                value={formData.transaction_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="receita">Receita</option>
                <option value="despesa">Despesa</option>
              </select>
            </div>

            <Input
              label="Descrição"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ex: Consulta do paciente João"
              required
            />

            <Input
              label="Valor"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              placeholder="0.00"
              required
            />

            <Input
              label="Data"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="paid"
                  checked={formData.paid}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Marcar como pago</span>
              </label>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-green-600"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/financial')}
                className="bg-gray-400"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
