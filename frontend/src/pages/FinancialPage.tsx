import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { financialAPI } from '../api/endpoints';
import { useFinancialStore } from '../store/financialStore';
import { Card, Button, Table, Input, Badge } from '../components/ui';
import toast from 'react-hot-toast';

export const FinancialPage: React.FC = () => {
  const navigate = useNavigate();
  const { transactions, loading, setTransactions, setLoading, removeTransaction } = useFinancialStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'receita' | 'despesa'>('all');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const response = await financialAPI.list();
      setTransactions(response.data);
    } catch (error) {
      toast.error('Erro ao carregar transações');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar esta transação?')) return;

    try {
      await financialAPI.delete(id);
      removeTransaction(id);
      toast.success('Transação removida com sucesso');
    } catch (error) {
      toast.error('Erro ao remover transação');
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = typeFilter === 'all' || t.transaction_type === typeFilter;
    return matchSearch && matchType;
  });

  const totalReceitas = transactions
    .filter((t) => t.transaction_type === 'receita')
    .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);

  const totalDespesas = transactions
    .filter((t) => t.transaction_type === 'despesa')
    .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);

  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">💰 Financeiro</h1>
          <Button onClick={() => navigate('/financial/new')} className="bg-green-600">
            + Nova Transação
          </Button>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-green-50 border-green-200">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Receitas</p>
              <p className="text-3xl font-bold text-green-600">R$ {totalReceitas.toFixed(2)}</p>
            </div>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Despesas</p>
              <p className="text-3xl font-bold text-red-600">R$ {totalDespesas.toFixed(2)}</p>
            </div>
          </Card>

          <Card className={saldo >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Saldo</p>
              <p className={`text-3xl font-bold ${saldo >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                R$ {saldo.toFixed(2)}
              </p>
            </div>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Buscar"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por descrição..."
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos</option>
                <option value="receita">Receita</option>
                <option value="despesa">Despesa</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Tabela */}
        <Card>
          {loading ? (
            <div className="text-center py-8">Carregando...</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Nenhuma transação encontrada</div>
          ) : (
            <Table
              headers={['Tipo', 'Descrição', 'Valor', 'Data', 'Status', 'Ações']}
              rows={filteredTransactions.map((t) => [
                <Badge
                  key={`type-${t.id}`}
                  variant={t.transaction_type === 'receita' ? 'success' : 'danger'}
                >
                  {t.transaction_type === 'receita' ? '⬆️ Receita' : '⬇️ Despesa'}
                </Badge>,
                t.description,
                `R$ ${t.amount.toFixed(2)}`,
                new Date(t.date).toLocaleDateString('pt-BR'),
                <Badge
                  key={`status-${t.id}`}
                  variant={t.paid ? 'success' : 'warning'}
                >
                  {t.paid ? '✓ Pago' : '⏳ Pendente'}
                </Badge>,
                <div key={`actions-${t.id}`} className="flex gap-2">
                  <Button
                    onClick={() => navigate(`/financial/${t.id}`)}
                    className="bg-blue-500 text-white text-xs px-2 py-1"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-500 text-white text-xs px-2 py-1"
                  >
                    Deletar
                  </Button>
                </div>,
              ])}
            />
          )}
        </Card>
      </div>
    </div>
  );
};
