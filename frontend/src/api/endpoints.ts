import api from './axios';

// Auth endpoints
export const authAPI = {
  login: (username: string, password: string) =>
    api.post('/auth/login/', { username, password }),
  logout: () =>
    api.post('/auth/logout/'),
  me: () =>
    api.get('/auth/me/'),
  refresh: (refresh_token: string) =>
    api.post('/auth/refresh/', { refresh_token }),
};

// Patient endpoints
export const patientAPI = {
  list: () =>
    api.get('/patients/'),
  create: (data: any) =>
    api.post('/patients/', data),
  retrieve: (id: number) =>
    api.get(`/patients/${id}/`),
  update: (id: number, data: any) =>
    api.put(`/patients/${id}/`, data),
  delete: (id: number) =>
    api.delete(`/patients/${id}/`),
};

// Medical Record endpoints
export const medicalRecordAPI = {
  list: () =>
    api.get('/medical-records/'),
  create: (data: any) =>
    api.post('/medical-records/', data),
  retrieve: (id: number) =>
    api.get(`/medical-records/${id}/`),
  update: (id: number, data: any) =>
    api.put(`/medical-records/${id}/`, data),
  delete: (id: number) =>
    api.delete(`/medical-records/${id}/`),
};

// Appointment endpoints
export const appointmentAPI = {
  list: () =>
    api.get('/appointments/'),
  create: (data: any) =>
    api.post('/appointments/', data),
  retrieve: (id: number) =>
    api.get(`/appointments/${id}/`),
  update: (id: number, data: any) =>
    api.put(`/appointments/${id}/`, data),
  delete: (id: number) =>
    api.delete(`/appointments/${id}/`),
  patch: (id: number, data: any) =>
    api.patch(`/appointments/${id}/`, data),
};

// Financial Transaction endpoints
export const financialAPI = {
  list: () =>
    api.get('/financial-transactions/'),
  create: (data: any) =>
    api.post('/financial-transactions/', data),
  retrieve: (id: number) =>
    api.get(`/financial-transactions/${id}/`),
  update: (id: number, data: any) =>
    api.put(`/financial-transactions/${id}/`, data),
  delete: (id: number) =>
    api.delete(`/financial-transactions/${id}/`),
  patch: (id: number, data: any) =>
    api.patch(`/financial-transactions/${id}/`, data),
};
