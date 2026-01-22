import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientAPI, appointmentAPI } from '../api/endpoints';
import { useAuthStore } from '../store/authStore';
import { Card, Button } from '../components/ui';
import toast from 'react-hot-toast';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    pendingPayments: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [patientsRes, appointmentsRes] = await Promise.all([
          patientAPI.list(),
          appointmentAPI.list(),
        ]);

        const appointments = appointmentsRes.data;
        const pendingPayments = appointments.filter(
          (a: any) => a.status === 'pendente'
        ).length;

        setStats({
          totalPatients: patientsRes.data.length,
          totalAppointments: appointments.length,
          pendingPayments,
        });

        setRecentAppointments(
          appointments.slice(0, 5).map((a: any) => ({
            id: a.id,
            patient: a.patient.name,
            dentist: a.dentist.first_name || a.dentist.username,
            date: a.date,
            time: a.time,
            status: a.status,
          }))
        );
      } catch (error) {
        toast.error('Erro ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bem-vindo, {user?.first_name || user?.username}! 👋
          </h1>
          <p className="text-gray-600">Aqui está um resumo da sua clínica</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total de Pacientes</p>
                <p className="text-3xl font-bold text-primary mt-2">{stats.totalPatients}</p>
              </div>
              <span className="text-4xl">👥</span>
            </div>
          </Card>

          <Card className="border-l-4 border-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total de Consultas</p>
                <p className="text-3xl font-bold text-secondary mt-2">{stats.totalAppointments}</p>
              </div>
              <span className="text-4xl">📅</span>
            </div>
          </Card>

          <Card className="border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pendências Financeiras</p>
                <p className="text-3xl font-bold text-red-500 mt-2">{stats.pendingPayments}</p>
              </div>
              <span className="text-4xl">💰</span>
            </div>
          </Card>
        </div>

        {/* Recent Appointments */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Consultas Recentes</h2>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/consultas')}
            >
              Ver Todas
            </Button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Carregando...</p>
          ) : recentAppointments.length === 0 ? (
            <p className="text-center text-gray-500">Nenhuma consulta agendada</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Paciente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Dentista</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Hora</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((apt: any) => (
                    <tr key={apt.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">{apt.patient}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{apt.dentist}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{apt.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{apt.time}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            apt.status === 'pago'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {apt.status === 'pago' ? 'Pago' : 'Pendente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
