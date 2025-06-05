import { Link, useLocation } from "react-router-dom"
import { Home, FolderKanban, ListTodo, Users, X } from "lucide-react"
import type { FC } from "react"

const navItems = [
  { name: "Dashboard", href: "/", icon: <Home size={20} /> },
  { name: "Proyectos", href: "/projects", icon: <FolderKanban size={20} /> },
  { name: "Tareas", href: "/tasks", icon: <ListTodo size={20} /> },
  { name: "Usuarios", href: "/users", icon: <Users size={20} /> },
]

interface SidebarProps {
  onClose?: () => void
}

export const Sidebar: FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation()
  return (
    <div className="bg-[#15192c] text-white min-h-screen flex flex-col border-r border-[#23263a] w-full">
      <div className="flex items-center gap-3 px-8 py-8 font-bold text-2xl tracking-wide relative">
        <span className="text-cyan-400">⬢</span> Mega Org
        {/* Botón de cerrar solo en móvil */}
        {onClose && (
          <button
            className="ml-auto md:hidden p-1 rounded hover:bg-[#23263a] transition-colors absolute right-4 top-1/2 -translate-y-1/2"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <X size={22} />
          </button>
        )}
      </div>
      <nav className="flex-1">
        {navItems.map(item => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-4 px-8 py-3 transition-colors rounded-lg my-1
              ${location.pathname === item.href
                ? "bg-[#23263a] text-cyan-400 font-semibold"
                : "hover:bg-[#23263a] text-white"}
            `}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
      {/* Aquí puedes agregar estado del sistema, acciones rápidas, etc. */}
    </div>
  )
} 