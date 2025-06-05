import api from './api';
import type { User, UserResponse, CreateUserData, UpdateUserData, SingleUserResponse } from '@/types/user';

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
  createUser: async (userData: CreateUserData): Promise<User> => {
    const response = await api.post<UserResponse>('/users', userData);
    return response.data.data[0];
  },

  // Actualizar un usuario
  updateUser: async (id: number, userData: UpdateUserData): Promise<User> => {
    const response = await api.put<UserResponse>(`/users/${id}`, userData);
    return response.data.data[0];
  },

  // Eliminar un usuario
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
}; 