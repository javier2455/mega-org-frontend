import { z } from 'zod';

export const createUserSchema = z.object({
  fullname: z.string().min(1, 'El nombre completo es requerido'),
  user: z.string().min(1, 'El usuario es requerido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: z.string().min(1, 'El rol es requerido'),
});

export const editUserSchema = createUserSchema.extend({
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .optional()
    .nullable()
    .or(z.literal('')),
});

export type CreateUserForm = z.infer<typeof createUserSchema>;
export type EditUserForm = z.infer<typeof editUserSchema>;
