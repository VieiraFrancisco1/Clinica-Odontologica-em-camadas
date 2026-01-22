import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientAPI } from '../api/endpoints';
import { usePatientStore, Patient } from '../store/patientStore';
import { Card, Button, Table, Input } from '../components/ui';
import toast from 'react-hot-toast';

export const PatientsPage: React.FC = () => {
  const navigate = useNavigate();
  const { patients, loading, setPatients, setLoading, removePatient } = usePatientStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    try {
      const response = await patientAPI.list();
      setPatients(response.data);
    } catch (error) {
      toast.error('Erro ao carregar pacientes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar este paciente?')) return;

    try {
      await patientAPI.delete(id);
      removePatient(id);
      toast.success('Paciente removido com sucesso');
    } catch (error) {
      toast.error('Erro ao remover paciente');
    }
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.cpf.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Pacientes</h1>
            <p className="text-gray-600 mt-1">Gerencie todos os pacientes cadastrados</p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/pacientes/novo')}
          >
            + Novo Paciente
          </Button>
        </div>

        <Card className="mb-6">
          <Input
            type="text"
            placeholder="Buscar por nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Card>

        <Card>
          {loading ? (
            <p className="text-center text-gray-500 py-8">Carregando pacientes...</p>
          ) : (
            <Table
              columns={[
                { header: 'Nome', key: 'name' },
                { header: 'CPF', key: 'cpf' },
                { header: 'Telefone', key: 'phone' },
                { header: 'Data de Nascimento', key: 'birth_date' },
              ]}
              data={filteredPatients}
              actions={(patient: Patient) => (
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/pacientes/${patient.id}`)}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/pacientes/${patient.id}/editar`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(patient.id)}
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
