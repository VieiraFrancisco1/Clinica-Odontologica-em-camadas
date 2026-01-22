import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/endpoints';
import { useAuthStore } from '../store/authStore';
import { Button, Input, Card } from '../components/ui';
import toast from 'react-hot-toast';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login(username, password);
      const { access_token, refresh_token } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      setAuthenticated(true);
      setUser({
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        first_name: response.data.user.first_name,
        last_name: response.data.user.last_name,
      });

      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">🦷 Clínica Odontológica</h1>
          <p className="text-gray-600">Sistema de Gestão</p>
        </div>

        <form onSubmit={handleLogin}>
          <Input
            label="Usuário"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
            required
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-6"
          >
            {loading ? 'Autenticando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600 mb-2"><strong>Credenciais de Teste:</strong></p>
          <p className="text-xs text-gray-500">Usuário: admin</p>
          <p className="text-xs text-gray-500">Senha: admin123</p>
        </div>
      </Card>
    </div>
  );
};
