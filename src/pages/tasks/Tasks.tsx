import { useState, useEffect } from 'react';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskDetails } from '@/components/tasks/TaskDetails';
import { taskService } from '@/services/taskService';
import type { Task } from '@/types/task';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Cargar tareas al montar el componente
  useEffect(() => {
    loadTasks();
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

  // Manejar eliminación de tareas
  const handleDelete = async (task: Task) => {
    console.log(task);
  };

  // Manejar edición de tareas
  const handleEdit = (task: Task) => {
    console.log(task);
  };

  // Manejar detalles de tareas
  const handleOpenDetails = (task: Task) => {
    setSelectedTask(task);
    setDetailsOpen(true);
  };

  // Manejar creación de tareas
  const handleCreate = () => {
    console.log('create');
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
        task={selectedTask ? selectedTask : null}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </div>
  );
}
