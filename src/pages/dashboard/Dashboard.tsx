import { DashboardStatCard } from '@/components/dashboard/DashboardStatCard';
import {
  FolderKanban,
  ListTodo,
  Users,
  CheckCircle2,
  Menu,
} from 'lucide-react';
import type { FC } from 'react';

interface DashboardProps {
  onOpenSidebar?: () => void;
}

const Dashboard: FC<DashboardProps> = ({ onOpenSidebar }) => {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold text-white'>Dashboard</h1>
        {onOpenSidebar && (
          <button
            className='md:hidden p-2 rounded-md bg-[#23263a] text-white'
            onClick={onOpenSidebar}
            aria-label='Abrir menú'
          >
            <Menu size={24} />
          </button>
        )}
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <DashboardStatCard
          title='Proyectos Activos'
          value={0}
          icon={<FolderKanban size={30} />}
          iconColor='text-cyan-400/40'
        />
        <DashboardStatCard
          title='Tareas Pendientes'
          value={0}
          icon={<ListTodo size={30} />}
          iconColor='text-yellow-400/40'
        />
        <DashboardStatCard
          title='Miembros del equipo'
          value={0}
          icon={<Users size={30} />}
          iconColor='text-green-400/40'
        />
        <DashboardStatCard
          title='Tareas completadas'
          value={0}
          icon={<CheckCircle2 size={30} />}
          iconColor='text-purple-400/40'
        />
      </div>
    </div>
  );
};

export default Dashboard;
