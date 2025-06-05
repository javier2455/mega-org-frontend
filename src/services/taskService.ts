import type { Task, CreateTaskDTO } from '@/types/task';
import api from './api';

export const taskService = {
  // Obtener todas las tareas
  async getAll(): Promise<Task[]> {
    const response = await api.get('/tasks');
    return response.data.data;
  },

  // Obtener una tarea por ID
  async getById(id: number): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);
    return response.data.data;
  },

  // Crear una nueva tarea
  async create(task: CreateTaskDTO): Promise<Task> {
    const response = await api.post('/tasks', task);
    return response.data.data;
  },

  // Actualizar una tarea existente
  async update(id: number, task: Partial<CreateTaskDTO>): Promise<Task> {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data.data;
  },

  // Eliminar una tarea
  async delete(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  }
}; 