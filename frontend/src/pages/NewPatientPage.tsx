import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientAPI } from '../api/endpoints';
import { usePatientStore } from '../store/patientStore';
import { Card, Button, Input } from '../components/ui';
import toast from 'react-hot-toast';

export const NewPatientPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    birth_date: '',
    cpf: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const addPatient = usePatientStore((state) => state.addPatient);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.address.trim()) newErrors.address = 'Endereço é obrigatório';
    if (!formData.birth_date) newErrors.birth_date = 'Data de nascimento é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await patientAPI.create(formData);
      addPatient(response.data);
      toast.success('Paciente cadastrado com sucesso!');
      navigate('/pacientes');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Erro ao cadastrar paciente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Novo Paciente</h1>
          <p className="text-gray-600 mt-1">Cadastre um novo paciente no sistema</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome Completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Digite o nome completo"
            />

            <Input
              label="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              error={errors.cpf}
              placeholder="000.000.000-00"
            />

            <Input
              label="Telefone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="(00) 00000-0000"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Digite o endereço completo"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={3}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <Input
              label="Data de Nascimento"
              name="birth_date"
              type="date"
              value={formData.birth_date}
              onChange={handleChange}
              error={errors.birth_date}
            />

            <div className="flex space-x-4 mt-6">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Salvando...' : 'Cadastrar'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => navigate('/pacientes')}
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
