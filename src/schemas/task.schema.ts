import { z } from "zod";
import { TaskStatus, TaskPriority } from "@/types/task";

export const createTaskSchema = z.object({
  title: z.string().min(3, "El título es obligatorio"),
  description: z.string().optional(),
  notes: z.string().optional(),
  dueDate: z.string().min(1, "La fecha límite es obligatoria"),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  assignedToId: z.number({ required_error: "Debes asignar un usuario" }),
});

export const editTaskSchema = createTaskSchema.partial();

export type CreateTaskForm = z.infer<typeof createTaskSchema>;
export type EditTaskForm = z.infer<typeof editTaskSchema>;