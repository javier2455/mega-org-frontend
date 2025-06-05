import type { User } from './user';

// Enums para los estados y prioridades
export enum TaskStatus {
    NEW = 'new',
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    IN_REVIEW = 'in_review',
    DONE = 'done'
}

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical'

}

// Interfaz principal de Task
export interface Task {
  id: number;
  title: string;
  description?: string;
  notes?: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: User;
  createdAt: string;
  updatedAt: string;
}

// DTO para crear una nueva tarea
export interface CreateTaskDTO {
  title: string;
  description?: string;
  notes?: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedToId: number;
}
