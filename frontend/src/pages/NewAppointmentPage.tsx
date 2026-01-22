import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI, patientAPI } from '../api/endpoints';
import { useAppointmentStore } from '../store/appointmentStore';
import { Card, Button, Input } from '../components/ui';
import toast from 'react-hot-toast';

export const NewAppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [dentists, setDentists] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    patient: '',
    dentist: '',
    date: '',
    time: '',
    procedure: '',
    status: 'pendente',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const addAppointment = useAppointmentStore((state) => state.addAppointment);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // In a real app, you'd load dentists from a separate endpoint
      const patientsRes = await patientAPI.list();
      setPatients(patientsRes.data);
      // Mock dentists - in production, fetch from backend
      setDentists([
        { id: 1, first_name: 'Dr. João', username: 'joao' },
        { id: 2, first_name: 'Dra. Maria', username: 'maria' },
      ]);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patient) newErrors.patient = 'Paciente é obrigatório';
    if (!formData.dentist) newErrors.dentist = 'Dentista é obrigatório';
    if (!formData.date) newErrors.date = 'Data é obrigatória';
    if (!formData.time) newErrors.time = 'Hora é obrigatória';
    if (!formData.procedure.trim()) newErrors.procedure = 'Procedimento é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await appointmentAPI.create({
        patient: parseInt(formData.patient),
        dentist: parseInt(formData.dentist),
        date: formData.date,
        time: formData.time,
        procedure: formData.procedure,
        status: formData.status,
      });
      addAppointment(response.data);
      toast.success('Consulta agendada com sucesso!');
      navigate('/consultas');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Erro ao agendar consulta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Nova Consulta</h1>
          <p className="text-gray-600 mt-1">Agende uma nova consulta</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
              <select
                name="patient"
                value={formData.patient}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.patient ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione um paciente</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.patient && <p className="text-red-500 text-sm mt-1">{errors.patient}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Dentista</label>
              <select
                name="dentist"
                value={formData.dentist}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.dentist ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione um dentista</option>
                {dentists.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.first_name || d.username}
                  </option>
                ))}
              </select>
              {errors.dentist && <p className="text-red-500 text-sm mt-1">{errors.dentist}</p>}
            </div>

            <Input
              label="Data"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
            />

            <Input
              label="Hora"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              error={errors.time}
            />

            <Input
              label="Procedimento"
              name="procedure"
              value={formData.procedure}
              onChange={handleChange}
              error={errors.procedure}
              placeholder="Digite o procedimento"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="pendente">Pendente</option>
                <option value="pago">Pago</option>
              </select>
            </div>

            <div className="flex space-x-4 mt-6">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Agendando...' : 'Agendar'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => navigate('/consultas')}
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
