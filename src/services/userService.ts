import api from './api';
import type { User, UserResponse, SingleUserResponse } from '@/types/user';

export const userService = {
  // Obtener todos los usuarios
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<UserResponse>('/users');
    return response.data.data;
  },

  // Obtener un usuario por ID
  getUserById: async (id: number): Promise<User> => {
    const response = await api.get<SingleUserResponse>(`/users/${id}`);
    return response.data.data;
  },

  // Crear un nuevo usuario
  createUser: async (formData: FormData): Promise<User> => {
    const response = await api.post<UserResponse>('/users', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data[0];
  },

  // Actualizar un usuario
  updateUser: async (id: number, formData: FormData): Promise<User> => {
    const response = await api.put<UserResponse>(`/users/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data[0];
  },

  // Eliminar un usuario
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
