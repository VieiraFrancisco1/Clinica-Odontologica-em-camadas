import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { patientAPI, medicalRecordAPI } from '../api/endpoints';
import { Patient } from '../store/patientStore';
import { Card, Button } from '../components/ui';
import toast from 'react-hot-toast';

export const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [medicalRecord, setMedicalRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState(false);
  const [recordText, setRecordText] = useState('');

  useEffect(() => {
    if (id) {
      loadPatient();
    }
  }, [id]);

  const loadPatient = async () => {
    try {
      const patientRes = await patientAPI.retrieve(parseInt(id!));
      setPatient(patientRes.data);

      // Try to load medical record
      const recordsRes = await medicalRecordAPI.list();
      const record = recordsRes.data.find((r: any) => r.patient.id === patientRes.data.id);
      if (record) {
        setMedicalRecord(record);
        setRecordText(record.record);
      }
    } catch (error) {
      toast.error('Erro ao carregar dados do paciente');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecord = async () => {
    try {
      if (medicalRecord) {
        await medicalRecordAPI.update(medicalRecord.id, {
          patient: patient?.id,
          record: recordText,
        });
        setMedicalRecord({ ...medicalRecord, record: recordText });
      } else if (patient) {
        const response = await medicalRecordAPI.create({
          patient: patient.id,
          record: recordText,
        });
        setMedicalRecord(response.data);
      }
      setEditingRecord(false);
      toast.success('Prontuário atualizado com sucesso');
    } catch (error) {
      toast.error('Erro ao salvar prontuário');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <p className="text-gray-500">Paciente não encontrado</p>
      </div>
    );
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{patient.name}</h1>
            <p className="text-gray-600 mt-1">Detalhes do Paciente</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              onClick={() => navigate(`/pacientes/${patient.id}/editar`)}
            >
              Editar
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/pacientes')}
            >
              Voltar
            </Button>
          </div>
        </div>

        {/* Patient Info */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Informações Pessoais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Nome Completo</p>
              <p className="text-lg font-semibold text-gray-800">{patient.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">CPF</p>
              <p className="text-lg font-semibold text-gray-800">{patient.cpf}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Telefone</p>
              <p className="text-lg font-semibold text-gray-800">{patient.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Data de Nascimento</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(patient.birth_date).toLocaleDateString('pt-BR')} ({calculateAge(patient.birth_date)} anos)
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Endereço</p>
              <p className="text-lg font-semibold text-gray-800">{patient.address}</p>
            </div>
          </div>
        </Card>

        {/* Medical Record */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Prontuário</h2>
            {!editingRecord && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setEditingRecord(true)}
              >
                Editar Prontuário
              </Button>
            )}
          </div>

          {editingRecord ? (
            <div>
              <textarea
                value={recordText}
                onChange={(e) => setRecordText(e.target.value)}
                placeholder="Digite as observações do prontuário..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={8}
              />
              <div className="flex space-x-4 mt-4">
                <Button
                  variant="primary"
                  onClick={handleSaveRecord}
                >
                  Salvar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditingRecord(false);
                    if (medicalRecord) {
                      setRecordText(medicalRecord.record);
                    }
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg min-h-32">
              {medicalRecord ? (
                <p className="text-gray-700 whitespace-pre-wrap">{medicalRecord.record || 'Sem observações'}</p>
              ) : (
                <p className="text-gray-500 italic">Nenhum prontuário registrado</p>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
