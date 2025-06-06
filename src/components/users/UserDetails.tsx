import { useEffect, useState } from 'react';
import { userService } from '@/services/userService';
import { Loader2, User2, X } from 'lucide-react';
import type { User } from '@/types/user';
import { translateBadge } from '@/lib/translate';
import CustomBadge from '../shared/CustomBadge';
import { API_URL } from '@/types/url';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface UserDetailsDrawerProps {
  userId: number | null;
  open: boolean;
  onClose: () => void;
}

export function UserDetailsDrawer({
  userId,
  open,
  onClose,
}: UserDetailsDrawerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && userId) {
      setLoading(true);
      setError(null);
      userService
        .getUserById(userId)
        .then(setUser)
        .catch(() => setError('Error al cargar los detalles'))
        .finally(() => setLoading(false));
    } else {
      setUser(null);
      setError(null);
    }
  }, [userId, open]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md z-50 bg-[#181c2f] shadow-2xl border-l border-[#23263a] transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col`}
      style={{ pointerEvents: open ? 'auto' : 'none' }}
    >
      <div className='flex items-center justify-between px-6 py-4 border-b border-[#23263a]'>
        <h2 className='text-lg font-semibold text-white'>
          Detalles del usuario
        </h2>
        <button
          onClick={onClose}
          className='p-2 rounded hover:bg-[#23263a] text-white'
        >
          <X className='size-5' />
        </button>
      </div>
      <div className='flex-1 p-6 overflow-y-auto'>
        {loading ? (
          <div className='flex items-center justify-center h-full'>
            <Loader2 className='animate-spin text-cyan-400 size-8' />
          </div>
        ) : error ? (
          <div className='text-red-400 text-center'>{error}</div>
        ) : user ? (
          <div className='space-y-4'>
            <div className=''>
              <span className='block text-xs text-cyan-300 mb-1'>
                Nombre completo
              </span>
              <div className='flex items-center justify-between gap-2'>
                <span className='text-white font-medium'>{user.fullname}</span>
                {user.avatarUrl && (
                  <Avatar className='size-10'>
                    <AvatarImage src={`${API_URL}${user.avatarUrl}`} />
                    <AvatarFallback>
                      <User2 />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
            <div>
              <span className='block text-xs text-cyan-300 mb-1'>Usuario</span>
              <span className='text-white'>{user.user}</span>
            </div>
            <div>
              <span className='block text-xs text-cyan-300 mb-1'>Rol</span>
              <span className='text-white'>{translateBadge(user.role)}</span>
            </div>
            <div>
              <span className='block text-xs text-cyan-300 mb-1'>Creado</span>
              <span className='text-white'>
                {new Date(user.createdAt).toLocaleString()}
              </span>
            </div>
            <div>
              <span className='block text-xs text-cyan-300 mb-1'>
                Actualizado
              </span>
              <span className='text-white'>
                {new Date(user.updatedAt).toLocaleString()}
              </span>
            </div>
            {/* dentro del render del UserDetailsDrawer, después de los datos
            principales del usuario */}
            <div className='mt-6'>
              <h3 className='text-cyan-300 font-semibold mb-2'>
                Tareas asignadas
              </h3>
              {user.tasks && user.tasks.length > 0 ? (
                <div className='rounded border border-cyan-400 bg-[#181c2f] p-4 max-h-60 overflow-auto'>
                  <table className='w-full text-sm'>
                    <thead>
                      <tr>
                        <th className='text-left text-cyan-200'>Título</th>
                        <th className='text-left text-cyan-200'>Prioridad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.tasks.map((task) => (
                        <tr key={task.id} className='h-12'>
                          <td className='text-white py-2'>{task.title}</td>
                          <td className=' py-2'>
                            <CustomBadge
                              label={translateBadge(task.priority)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className='text-slate-400 italic'>
                  No tiene tareas asignadas.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className='text-slate-400 text-center'>
            Selecciona un usuario para ver los detalles.
          </div>
        )}
      </div>
    </div>
  );
}
