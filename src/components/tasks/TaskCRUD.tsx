import { useEffect, useState } from 'react';
import type { Task } from '@/types/task';
import type { User } from '@/types/user';
import { taskService } from '@/services/taskService';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  createTaskSchema,
  editTaskSchema,
  type CreateTaskForm,
  type EditTaskForm,
} from '@/schemas/task.schema';
import { TaskStatus, TaskPriority } from '@/types/task';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';

interface TaskCRUDProps {
  mode: 'create' | 'edit' | 'delete';
  task: Task | null;
  users: User[];
  onClose: () => void;
  reloadTasks: () => Promise<void>;
}

export default function TaskCRUD({
  mode,
  task,
  users,
  onClose,
  reloadTasks,
}: TaskCRUDProps) {
  // Formulario para crear tarea
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: createErrors, isSubmitting: isCreating },
    reset: resetCreate,
    setValue: setCreateValue,
    watch,
  } = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      notes: '',
      dueDate: '',
      status: TaskStatus.NEW,
      priority: TaskPriority.MEDIUM,
      assignedToId: undefined,
    },
  });

  // Formulario para editar tarea
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: editErrors, isSubmitting: isEditing },
    setValue: setEditValue,
    watch: watchEdit,
  } = useForm<EditTaskForm>({
    resolver: zodResolver(editTaskSchema),
  });

  const [calendarOpen, setCalendarOpen] = useState(false);

  // Cargar datos de la tarea a editar cuando cambie la tarea
  useEffect(() => {
    if (mode === 'edit' && task) {
      setEditValue('title', task.title);
      setEditValue('description', task.description || '');
      setEditValue('notes', task.notes || '');
      setEditValue('dueDate', task.dueDate);
      setEditValue('status', task.status);
      setEditValue('priority', task.priority);
      setEditValue('assignedToId', task.assignedTo.id);
    } else if (mode === 'create') {
      resetCreate();
    }
  }, [mode, task, setEditValue, resetCreate]);

  // Crear tarea
  const onSubmitCreate = async (data: CreateTaskForm) => {
    try {
      await taskService.create(data);
      toast.success('Tarea creada correctamente');
      onClose();
      await reloadTasks();
    } catch (err: unknown) {
      console.log(err);
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || 'Error al crear la tarea');
    }
  };

  // Editar tarea
  const onSubmitEdit = async (data: EditTaskForm) => {
    if (!task) return;
    try {
      await taskService.update(task.id, data);
      toast.success('Tarea actualizada correctamente');
      onClose();
      await reloadTasks();
    } catch (err: unknown) {
      console.log(err);
      toast.error('Error al actualizar la tarea');
    }
  };

  // Eliminar tarea
  const handleDelete = async () => {
    if (!task) return;
    try {
      await taskService.delete(task.id);
      toast.success('Tarea eliminada correctamente');
      onClose();
      await reloadTasks();
    } catch (err: unknown) {
      console.log(err);
      toast.error('Error al eliminar la tarea');
    }
  };

  // Renderiza el modal correspondiente según el modo
  if (mode === 'create') {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className='bg-[#181c2f] border-[#23263a] shadow-2xl rounded-lg  p-8 xl:min-w-[1024px]'>
          <DialogHeader className='mb-6 border-b border-[#23263a] pb-4'>
            <DialogTitle className='text-2xl font-bold text-white'>
              Crear nueva tarea
            </DialogTitle>
          </DialogHeader>
          <form
            className='grid grid-cols-1 lg:grid-cols-2 gap-6'
            onSubmit={handleSubmitCreate(onSubmitCreate)}
          >
            {/* Columna izquierda */}
            <div className='flex flex-col gap-4'>
              {/* Título */}
              <div className='space-y-2'>
                <Label htmlFor='title' className='text-cyan-300 font-medium'>
                  Título
                </Label>
                <Input
                  id='title'
                  {...registerCreate('title')}
                  autoComplete='off'
                  className='text-white'
                />
                {createErrors.title && (
                  <p className='text-xs text-red-400 mt-1'>
                    {createErrors.title.message}
                  </p>
                )}
              </div>
              <div className='flex flex-col md:hidden gap-4'>
                {/* Descripción */}
                <div className='space-y-2 flex-1'>
                  <Label
                    htmlFor='description'
                    className='text-cyan-300 font-medium'
                  >
                    Descripción
                  </Label>
                  <Textarea
                    id='description'
                    {...registerCreate('description')}
                    className='text-white bg-[#101223] border border-[#23263a] rounded-md px-3 py-2 min-h-[100px] resize-vertical w-full'
                  />
                  {createErrors.description && (
                    <p className='text-xs text-red-400 mt-1'>
                      {createErrors.description.message}
                    </p>
                  )}
                </div>
                {/* Notas */}
                <div className='space-y-2 flex-1'>
                  <Label htmlFor='notes' className='text-cyan-300 font-medium'>
                    Notas
                  </Label>
                  <Textarea
                    id='notes'
                    {...registerCreate('notes')}
                    className='text-white bg-[#101223] border border-[#23263a] rounded-md px-3 py-2 min-h-[100px] resize-vertical w-full'
                  />
                  {createErrors.notes && (
                    <p className='text-xs text-red-400 mt-1'>
                      {createErrors.notes.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Fecha límite */}
              <div className='space-y-2'>
                <Label htmlFor='dueDate' className='text-cyan-300 font-medium'>
                  Fecha límite
                </Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Input
                      id='dueDate'
                      type='text'
                      readOnly
                      value={
                        watch('dueDate')
                          ? format(new Date(watch('dueDate')), 'dd/MM/yyyy')
                          : ''
                      }
                      placeholder='Selecciona una fecha'
                      className='text-white cursor-pointer bg-[#101223] border border-[#23263a] rounded-md px-3 py-2 w-full'
                      onClick={() => setCalendarOpen(true)}
                    />
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0 bg-[#181c2f] border-[#23263a]'>
                    <Calendar
                      mode='single'
                      selected={
                        watch('dueDate')
                          ? new Date(watch('dueDate'))
                          : undefined
                      }
                      onSelect={(date) => {
                        setCreateValue(
                          'dueDate',
                          date ? date.toISOString().slice(0, 10) : '',
                        );
                        setCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {createErrors.dueDate && (
                  <p className='text-xs text-red-400 mt-1'>
                    {createErrors.dueDate.message}
                  </p>
                )}
              </div>
              {/* Estado y Prioridad */}
              <div className='flex flex-col lg:flex-row gap-4'>
                <div className='flex-1  space-y-2'>
                  <Label htmlFor='status' className='text-cyan-300 font-medium'>
                    Estado
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setCreateValue('status', value as TaskStatus, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger className='text-white'>
                      <SelectValue placeholder='Selecciona un estado' />
                    </SelectTrigger>
                    <SelectContent className='bg-[#181c2f] text-white border-[#181c2f]'>
                      {Object.values(TaskStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {createErrors.status && (
                    <p className='text-xs text-red-400 mt-1'>
                      {createErrors.status.message}
                    </p>
                  )}
                </div>
                <div className='flex-1 space-y-2'>
                  <Label
                    htmlFor='priority'
                    className='text-cyan-300 font-medium'
                  >
                    Prioridad
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setCreateValue('priority', value as TaskPriority, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger className='text-white'>
                      <SelectValue placeholder='Selecciona una prioridad' />
                    </SelectTrigger>
                    <SelectContent className='bg-[#181c2f] text-white border-[#181c2f]'>
                      {Object.values(TaskPriority).map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {createErrors.priority && (
                    <p className='text-xs text-red-400 mt-1'>
                      {createErrors.priority.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Asignar a */}
              <div className='space-y-2'>
                <Label
                  htmlFor='assignedToId'
                  className='text-cyan-300 font-medium'
                >
                  Asignar a
                </Label>
                <Select
                  onValueChange={(value) =>
                    setCreateValue('assignedToId', Number(value), {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className='text-white w-full'>
                    <SelectValue placeholder='Selecciona un usuario' />
                  </SelectTrigger>
                  <SelectContent className='bg-[#181c2f] text-white border-[#181c2f]'>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.fullname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {createErrors.assignedToId && (
                  <p className='text-xs text-red-400 mt-1'>
                    {createErrors.assignedToId.message}
                  </p>
                )}
              </div>
            </div>
            {/* Columna derecha */}
            <div className='flex-col gap-4 hidden md:flex'>
              {/* Descripción */}
              <div className='space-y-2 flex-1'>
                <Label
                  htmlFor='description'
                  className='text-cyan-300 font-medium'
                >
                  Descripción
                </Label>
                <Textarea
                  id='description'
                  {...registerCreate('description')}
                  className='text-white bg-[#101223] border border-[#23263a] rounded-md px-3 py-2 min-h-[100px] resize-vertical w-full'
                />
                {createErrors.description && (
                  <p className='text-xs text-red-400 mt-1'>
                    {createErrors.description.message}
                  </p>
                )}
              </div>
              {/* Notas */}
              <div className='space-y-2 flex-1'>
                <Label htmlFor='notes' className='text-cyan-300 font-medium'>
                  Notas
                </Label>
                <Textarea
                  id='notes'
                  {...registerCreate('notes')}
                  className='text-white bg-[#101223] border border-[#23263a] rounded-md px-3 py-2 min-h-[100px] resize-vertical w-full'
                />
                {createErrors.notes && (
                  <p className='text-xs text-red-400 mt-1'>
                    {createErrors.notes.message}
                  </p>
                )}
              </div>
            </div>
            {/* Botones */}
            <div className='col-span-2 flex justify-end gap-3 mt-4'>
              <Button
                type='button'
                variant='ghost'
                onClick={onClose}
                className='text-white'
              >
                Cancelar
              </Button>
              <Button
                type='submit'
                disabled={isCreating}
                className='bg-cyan-600 hover:bg-cyan-700 text-white'
              >
                {isCreating ? 'Creando...' : 'Aceptar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  if (mode === 'edit' && task) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className='bg-[#181c2f] border-[#23263a] shadow-2xl rounded-lg p-8 xl:min-w-[1024px]'>
          <DialogHeader className='mb-6 border-b border-[#23263a] pb-4'>
            <DialogTitle className='text-2xl font-bold text-white'>
              Editar tarea
            </DialogTitle>
          </DialogHeader>
          <form
            className='grid grid-cols-1 lg:grid-cols-2 gap-6'
            onSubmit={handleSubmitEdit(onSubmitEdit)}
          >
            {/* Columna izquierda */}
            <div className='flex flex-col gap-4'>
              {/* Título */}
              <div className='space-y-2'>
                <Label
                  htmlFor='edit-title'
                  className='text-cyan-300 font-medium'
                >
                  Título
                </Label>
                <Input
                  id='edit-title'
                  {...registerEdit('title')}
                  autoComplete='off'
                  className='text-white'
                />
                {editErrors.title && (
                  <p className='text-xs text-red-400 mt-1'>
                    {editErrors.title.message}
                  </p>
                )}
              </div>
              {/* Fecha límite */}
              <div className='space-y-2'>
                <Label
                  htmlFor='edit-dueDate'
                  className='text-cyan-300 font-medium'
                >
                  Fecha límite
                </Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Input
                      id='edit-dueDate'
                      type='text'
                      readOnly
                      value={
                        watchEdit('dueDate')
                          ? format(
                              new Date(watchEdit('dueDate') || ''),
                              'dd/MM/yyyy',
                            )
                          : ''
                      }
                      placeholder='Selecciona una fecha'
                      className='text-white cursor-pointer bg-[#101223] border border-[#23263a] rounded-md px-3 py-2 w-full'
                      onClick={() => setCalendarOpen(true)}
                    />
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0 bg-[#181c2f] border-[#23263a]'>
                    <Calendar
                      mode='single'
                      selected={
                        watchEdit('dueDate')
                          ? new Date(watchEdit('dueDate') ?? '')
                          : undefined
                      }
                      onSelect={(date) => {
                        setEditValue(
                          'dueDate',
                          date ? format(date, 'yyyy-MM-dd') : '',
                        );
                        setCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {editErrors.dueDate && (
                  <p className='text-xs text-red-400 mt-1'>
                    {editErrors.dueDate.message}
                  </p>
                )}
              </div>
              {/* Estado y Prioridad */}
              <div className='flex gap-4'>
                <div className='flex-1 space-y-2'>
                  <Label
                    htmlFor='edit-status'
                    className='text-cyan-300 font-medium'
                  >
                    Estado
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setEditValue('status', value as TaskStatus, {
                        shouldValidate: true,
                      })
                    }
                    defaultValue={task?.status}
                  >
                    <SelectTrigger
                      id='edit-status'
                      className='w-full text-white'
                    >
                      <SelectValue placeholder='Selecciona un estado' />
                    </SelectTrigger>
                    <SelectContent className='bg-[#181c2f] text-white border-[#181c2f]'>
                      {Object.values(TaskStatus).map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className='hover:bg-[#23263a] focus:bg-[#23263a] focus:text-white'
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {editErrors.status && (
                    <p className='text-xs text-red-400 mt-1'>
                      {editErrors.status.message}
                    </p>
                  )}
                </div>
                <div className='flex-1 space-y-2'>
                  <Label
                    htmlFor='edit-priority'
                    className='text-cyan-300 font-medium'
                  >
                    Prioridad
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setEditValue('priority', value as TaskPriority, {
                        shouldValidate: true,
                      })
                    }
                    defaultValue={task?.priority}
                  >
                    <SelectTrigger
                      id='edit-priority'
                      className='w-full text-white'
                    >
                      <SelectValue placeholder='Selecciona una prioridad' />
                    </SelectTrigger>
                    <SelectContent className='bg-[#181c2f] text-white border-[#181c2f]'>
                      {Object.values(TaskPriority).map((priority) => (
                        <SelectItem
                          key={priority}
                          value={priority}
                          className='hover:bg-[#23263a] focus:bg-[#23263a] focus:text-white'
                        >
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {editErrors.priority && (
                    <p className='text-xs text-red-400 mt-1'>
                      {editErrors.priority.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Asignar a */}
              <div className='space-y-2'>
                <Label
                  htmlFor='edit-assignedToId'
                  className='text-cyan-300 font-medium'
                >
                  Asignar a
                </Label>
                <Select
                  onValueChange={(value) =>
                    setEditValue('assignedToId', Number(value), {
                      shouldValidate: true,
                    })
                  }
                  defaultValue={task?.assignedTo.id.toString()}
                >
                  <SelectTrigger
                    id='edit-assignedToId'
                    className='w-full text-white'
                  >
                    <SelectValue placeholder='Selecciona un usuario' />
                  </SelectTrigger>
                  <SelectContent className='bg-[#181c2f] text-white border-[#181c2f]'>
                    {users.map((user) => (
                      <SelectItem
                        key={user.id}
                        value={user.id.toString()}
                        className='hover:bg-[#23263a] focus:bg-[#23263a] focus:text-white'
                      >
                        {user.fullname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {editErrors.assignedToId && (
                  <p className='text-xs text-red-400 mt-1'>
                    {editErrors.assignedToId.message}
                  </p>
                )}
              </div>
            </div>
            {/* Columna derecha */}
            <div className='flex flex-col gap-4'>
              {/* Descripción */}
              <div className='space-y-2 flex-1'>
                <Label
                  htmlFor='edit-description'
                  className='text-cyan-300 font-medium'
                >
                  Descripción
                </Label>
                <Textarea
                  id='edit-description'
                  {...registerEdit('description')}
                  className='text-white bg-[#101223] border border-[#23263a] rounded-md px-3 py-2 min-h-[100px] resize-vertical w-full'
                />
                {editErrors.description && (
                  <p className='text-xs text-red-400 mt-1'>
                    {editErrors.description.message}
                  </p>
                )}
              </div>
              {/* Notas */}
              <div className='space-y-2 flex-1'>
                <Label
                  htmlFor='edit-notes'
                  className='text-cyan-300 font-medium'
                >
                  Notas
                </Label>
                <Textarea
                  id='edit-notes'
                  {...registerEdit('notes')}
                  className='text-white bg-[#101223] border border-[#23263a] rounded-md px-3 py-2 min-h-[100px] resize-vertical w-full'
                />
                {editErrors.notes && (
                  <p className='text-xs text-red-400 mt-1'>
                    {editErrors.notes.message}
                  </p>
                )}
              </div>
            </div>
            {/* Botones */}
            <div className='col-span-2 flex justify-end gap-3 mt-4'>
              <Button
                type='button'
                variant='ghost'
                onClick={onClose}
                className='text-white'
              >
                Cancelar
              </Button>
              <Button
                type='submit'
                disabled={isEditing}
                className='bg-cyan-600 hover:bg-cyan-700 text-white'
              >
                {isEditing ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  if (mode === 'delete' && task) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className='bg-[#181c2f] border-[#23263a] shadow-2xl rounded-lg p-8'>
          <DialogHeader className='mb-6 border-b border-[#23263a] pb-4'>
            <DialogTitle className='text-2xl font-bold text-white'>
              Confirmar eliminación
            </DialogTitle>
            <DialogDescription className='text-slate-400 mt-2'>
              ¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se
              puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='cancel' onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              className='bg-red-600 hover:bg-red-700 text-white'
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
