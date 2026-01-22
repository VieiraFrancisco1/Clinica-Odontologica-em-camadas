import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { authAPI } from './api/endpoints';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PatientsPage } from './pages/PatientsPage';
import { NewPatientPage } from './pages/NewPatientPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { NewAppointmentPage } from './pages/NewAppointmentPage';
import { FinancialPage } from './pages/FinancialPage';
import { NewFinancialPage } from './pages/NewFinancialPage';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const { setUser, setProfile, setAuthenticated, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await authAPI.me();
          setUser(response.data.user);
          setProfile(response.data.profile);
          setAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [setUser, setProfile, setAuthenticated, setLoading]);

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pacientes"
            element={
              <ProtectedRoute>
                <PatientsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pacientes/novo"
            element={
              <ProtectedRoute>
                <NewPatientPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/consultas"
            element={
              <ProtectedRoute>
                <AppointmentsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/consultas/nova"
            element={
              <ProtectedRoute>
                <NewAppointmentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/financial"
            element={
              <ProtectedRoute>
                <FinancialPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/financial/new"
            element={
              <ProtectedRoute>
                <NewFinancialPage />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
