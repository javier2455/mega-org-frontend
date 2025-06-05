import { useState, useEffect } from 'react';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskDetails } from '@/components/tasks/TaskDetails';
import TaskCRUD from '@/components/tasks/TaskCRUD';
import { taskService } from '@/services/taskService';
import { userService } from '@/services/userService';
import type { Task } from '@/types/task';
import type { User } from '@/types/user';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [crudOpen, setCrudOpen] = useState(false);
  const [crudMode, setCrudMode] = useState<'create' | 'edit' | 'delete'>('create');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Cargar tareas y usuarios al montar el componente
  useEffect(() => {
    loadTasks();
    loadUsers();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasksData = await taskService.getAll();
      setTasks(tasksData);
    } catch {
      setError('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const usersData = await userService.getUsers();
      setUsers(usersData);
    } catch {
      console.error('Error al cargar usuarios');
    }
  };

  // Manejar eliminación de tareas
  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setCrudMode('delete');
    setCrudOpen(true);
  };

  // Manejar edición de tareas
  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setCrudMode('edit');
    setCrudOpen(true);
  };

  // Manejar detalles de tareas
  const handleOpenDetails = (task: Task) => {
    setSelectedTask(task);
    setDetailsOpen(true);
  };

  // Manejar creación de tareas
  const handleCreate = () => {
    setSelectedTask(null);
    setCrudMode('create');
    setCrudOpen(true);
  };

  return (
    <div className='space-y-4'>
      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleOpenDetails}
        onCreate={handleCreate}
      />
      <TaskDetails
        task={selectedTask}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
      {crudOpen && (
        <TaskCRUD
          mode={crudMode}
          task={selectedTask}
          users={users}
          onClose={() => setCrudOpen(false)}
          reloadTasks={loadTasks}
        />
      )}
    </div>
  );
}
