import { X } from 'lucide-react';
import type { Task } from '@/types/task';
import CustomBadge from '../shared/CustomBadge';

interface TaskDetailsProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
}

export function TaskDetails({ task, open, onClose }: TaskDetailsProps) {
  if (!task) return null;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md z-50 bg-[#181c2f] shadow-2xl border-l border-[#23263a] transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col`}
      style={{ pointerEvents: open ? 'auto' : 'none' }}
    >
      <div className='p-6 space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <h2 className='text-[24px] font-semibold text-white'>
            Detalles de la Tarea
          </h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-[#23263a] rounded-md transition-colors'
          >
            <X className='size-5 text-white' />
          </button>
        </div>
        {/* Title and Status */}
        <div className='space-y-4'>
          <h4 className='text-sm font-medium text-cyan-300 mb-1'>Nombre</h4>
          <p className='text-xl font-medium text-white'>{task.title}</p>
          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col items-start gap-1'>
              <h4 className='text-sm font-medium text-cyan-300 mb-1'>Estado</h4>
              <CustomBadge label={task.status} />
            </div>
            <div className='flex flex-col items-start gap-1'>
              <h4 className='text-sm font-medium text-cyan-300 mb-1'>
                Prioridad
              </h4>
              <CustomBadge label={task.priority} />
            </div>
          </div>
        </div>
        {/* Main Info */}
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium text-cyan-300 mb-1'>
              Asignado a
            </h4>
            <p className='text-white'>{task.assignedTo.fullname}</p>
          </div>
          <div>
            <h4 className='text-sm font-medium text-cyan-300 mb-1'>
              Fecha límite
            </h4>
            <p className='text-white'>
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h4 className='text-sm font-medium text-cyan-300 mb-1'>Creado</h4>
              <p className='text-sm text-slate-300'>
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-cyan-300 mb-1'>
                Actualizado
              </h4>
              <p className='text-sm text-slate-300'>
                {new Date(task.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className='space-y-2'>
          <h4 className='text-sm font-medium text-cyan-300'>Descripción</h4>
          {task.description ? (
            <p className='text-white whitespace-pre-wrap'>{task.description}</p>
          ) : (
            <p className='text-slate-400 italic'>
              No hay descripción disponible
            </p>
          )}
        </div>
        {/* Notes */}
        <div className='space-y-2'>
          <h4 className='text-sm font-medium text-cyan-300'>Notas</h4>
          {task.notes ? (
            <p className='text-white whitespace-pre-wrap'>{task.notes}</p>
          ) : (
            <p className='text-slate-400 italic'>No hay notas disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
}
