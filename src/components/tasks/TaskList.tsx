import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Task } from '@/types/task';
import CustomBadge from '../shared/CustomBadge';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onDetails: (task: Task) => void;
  onCreate: () => void;
}

export function TaskList({
  tasks,
  loading,
  error,
  onEdit,
  onDelete,
  onDetails,
  onCreate,
}: TaskListProps) {
  if (loading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <span className='text-cyan-400'>Cargando tareas...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className='rounded-xl border border-red-500/50 bg-red-500/10 p-4'>
        <p className='text-sm text-red-400'>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-[24px] font-semibold text-white'>Tareas</h2>
        <button
          onClick={onCreate}
          className='bg-cyan-600 hover:bg-cyan-700 text-white cursor-pointer rounded-md px-4 py-2 font-semibold'
        >
          Agregar tarea
        </button>
      </div>
      {tasks.length === 0 ? (
        <div className='rounded-xl border border-[#23263a] bg-[#181c2f] shadow-md'>
          <div className='p-6'>
            <p className='text-base text-muted-foreground'>
              No hay tareas disponibles. Agrega tu primera tarea para comenzar.
            </p>
          </div>
        </div>
      ) : (
        <div className='rounded-xl border border-[#23263a] bg-[#181c2f] shadow-md'>
          <div className='relative w-full overflow-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='bg-[#20243a]'>
                  <th className='h-14 px-6 text-left align-middle font-semibold text-cyan-300 tracking-wide text-base rounded-tl-xl'>
                    Título
                  </th>
                  <th className='h-14 px-6 text-left align-middle font-semibold text-cyan-300 tracking-wide text-base'>
                    Asignado a
                  </th>
                  <th className='h-14 px-6 text-left align-middle font-semibold text-cyan-300 tracking-wide text-base'>
                    Estado
                  </th>
                  <th className='h-14 px-6 text-left align-middle font-semibold text-cyan-300 tracking-wide text-base'>
                    Prioridad
                  </th>
                  <th className='h-14 px-6 text-left align-middle font-semibold text-cyan-300 tracking-wide text-base rounded-tr-xl'>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, idx) => (
                  <tr
                    key={task.id}
                    className={`transition-colors ${
                      idx % 2 === 0 ? 'bg-[#181c2f]' : 'bg-[#1e2235]'
                    } hover:bg-[#23263a] border-b border-[#23263a] last:border-b-0`}
                  >
                    <td className='px-6 py-4 align-middle text-white font-medium'>
                      {task.title}
                    </td>
                    <td className='px-6 py-4 align-middle text-slate-300'>
                      {task.assignedTo.fullname}
                    </td>
                    <td className='px-6 py-4 align-middle'>
                      <CustomBadge label={task.status} />
                    </td>
                    <td className='px-6 py-4 align-middle'>
                      <CustomBadge label={task.priority} />
                    </td>
                    <td className='px-4 py-4 align-middle'>
                      <DropdownMenu>
                        <DropdownMenuTrigger className='p-2 hover:bg-[#23263a] rounded-md transition-colors cursor-pointer'>
                          <MoreVertical className='size-4 text-white' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-[#101223] border border-[#23263a]'>
                          <DropdownMenuItem
                            className='text-white hover:bg-[#23263a] focus:bg-[#23263a] focus:text-white'
                            onClick={() => onDetails(task)}
                          >
                            Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='text-white hover:bg-[#23263a] focus:bg-[#23263a] focus:text-white'
                            onClick={() => onEdit(task)}
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='text-red-400 hover:bg-[#23263a] focus:bg-[#23263a] focus:text-red-400'
                            onClick={() => onDelete(task)}
                          >
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
