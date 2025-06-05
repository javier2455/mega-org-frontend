import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3010/api', // Ajusta esto según tu configuración del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes manejar los errores globalmente
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api; 