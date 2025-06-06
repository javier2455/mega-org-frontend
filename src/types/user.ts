import type { Task } from './task';

export interface User {
  id: number;
  user: string;
  fullname: string;
  role: string;
  avatarUrl: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  success: boolean;
  data: User[];
  message?: string;
}

export interface SingleUserResponse {
  success: boolean;
  data: User;
  message?: string;
}

export interface CreateUserData {
  user: string;
  password: string;
  fullname: string;
  role: string;
  avatarUrl?: string;
}

export interface UpdateUserData {
  user?: string;
  password?: string;
  fullname?: string;
  role?: string;
  avatarUrl?: string;
}
