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
          'border-gray-400/40 text-gray-300': label === 'low',
          'border-blue-400/40 text-blue-300': label === 'medium',
          'border-yellow-400/40 text-yellow-300': label === 'high',
          'border-red-400/40 text-red-300': label === 'critical',
        },
        {
          'border-cyan-400/40 text-cyan-300': label === 'new',
          'border-blue-400/40 text-blue-300': label === 'pending',
          'border-yellow-400/40 text-yellow-300': label === 'in_progress',
          'border-green-400/40 text-green-300': label === 'completed',
          'border-purple-400/40 text-purple-300': label === 'in_review',
          'border-gray-400/40 text-gray-300': label === 'done',
        }
      )}
    >
      {label}
    </div>
  );
}
