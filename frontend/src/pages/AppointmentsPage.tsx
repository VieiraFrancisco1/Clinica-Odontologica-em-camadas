import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI } from '../api/endpoints';
import { useAppointmentStore, Appointment } from '../store/appointmentStore';
import { Card, Button, Table, Input } from '../components/ui';
import toast from 'react-hot-toast';

export const AppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { appointments, loading, setAppointments, setLoading, removeAppointment } = useAppointmentStore();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pago' | 'pendente'>('all');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const response = await appointmentAPI.list();
      setAppointments(response.data);
    } catch (error) {
      toast.error('Erro ao carregar consultas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar esta consulta?')) return;

    try {
      await appointmentAPI.delete(id);
      removeAppointment(id);
      toast.success('Consulta removida com sucesso');
    } catch (error) {
      toast.error('Erro ao remover consulta');
    }
  };

  const handleStatusChange = async (id: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'pago' ? 'pendente' : 'pago';
      const appointment = appointments.find((a) => a.id === id);
      
      if (!appointment) return;

      const response = await appointmentAPI.update(id, {
        ...appointment,
        status: newStatus,
      });

      const updatedAppointments = appointments.map((a) =>
        a.id === id ? response.data : a
      );
      setAppointments(updatedAppointments);
      toast.success('Status atualizado com sucesso');
    } catch (error) {
      toast.error('Erro ao atualizar status');
    }
  };

  const filteredAppointments = appointments.filter((a) =>
    filterStatus === 'all' ? true : a.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Consultas</h1>
            <p className="text-gray-600 mt-1">Gerencie as consultas agendadas</p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/consultas/nova')}
          >
            + Nova Consulta
          </Button>
        </div>

        <Card className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterStatus('pago')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'pago'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pagas
            </button>
            <button
              onClick={() => setFilterStatus('pendente')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'pendente'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pendentes
            </button>
          </div>
        </Card>

        <Card>
          {loading ? (
            <p className="text-center text-gray-500 py-8">Carregando consultas...</p>
          ) : (
            <Table
              columns={[
                { header: 'Paciente', key: 'patientName' },
                { header: 'Dentista', key: 'dentistName' },
                { header: 'Data', key: 'date' },
                { header: 'Hora', key: 'time' },
                { header: 'Procedimento', key: 'procedure' },
                { header: 'Status', key: 'statusDisplay' },
              ]}
              data={filteredAppointments.map((apt: Appointment) => ({
                id: apt.id,
                patientName: apt.patient.name,
                dentistName: apt.dentist.first_name || apt.dentist.username,
                date: apt.date,
                time: apt.time,
                procedure: apt.procedure,
                status: apt.status,
                statusDisplay: (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                      apt.status === 'pago'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                    onClick={() => handleStatusChange(apt.id, apt.status)}
                  >
                    {apt.status === 'pago' ? 'Pago' : 'Pendente'}
                  </span>
                ),
              }))}
              actions={(appointment: any) => (
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/consultas/${appointment.id}`)}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/consultas/${appointment.id}/editar`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Deletar
                  </Button>
                </div>
              )}
            />
          )}
        </Card>
      </div>
    </div>
  );
};
