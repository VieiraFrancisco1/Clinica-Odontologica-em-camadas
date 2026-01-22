import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from './ui';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">🦷 Clínica Odontológica</span>
          </Link>

          {user && (
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/dashboard')
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/pacientes"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/pacientes')
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Pacientes
                </Link>
                <Link
                  to="/consultas"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/consultas')
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Consultas
                </Link>
                <Link
                  to="/financial"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/financial')
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Financeiro
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">{user.first_name || user.username}</p>
                  <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
