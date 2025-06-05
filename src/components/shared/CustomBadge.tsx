import clsx from 'clsx';

interface CustomBadgeProps {
  label: string;
}

export default function CustomBadge({ label }: CustomBadgeProps) {
  return (
    <div
      className={clsx(
        'inline-block rounded border border-cyan-400/40 text-cyan-300 px-3 py-1 text-xs font-semibold',
        {
          'border-gray-400/40 text-gray-300': label === 'Bajo',
          'border-blue-400/40 text-blue-300': label === 'Medio',
          'border-yellow-400/40 text-yellow-300': label === 'Alto',
          'border-red-400/40 text-red-300': label === 'Crítico',
        },
        {
          'border-cyan-400/40 text-cyan-300': label === 'Nuevo',
          'border-blue-400/40 text-blue-300': label === 'Pendiente',
          'border-yellow-400/40 text-yellow-300': label === 'En progreso',
          'border-green-400/40 text-green-300': label === 'Completado',
          'border-purple-400/40 text-purple-300': label === 'En revisión',
          'border-gray-400/40 text-gray-300': label === 'Finalizado',
        }
      )}
    >
      {label}
    </div>
  );
}
