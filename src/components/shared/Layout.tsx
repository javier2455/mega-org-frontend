import { Sidebar } from "./Sidebar"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Toaster } from "sonner"

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#101223]">
      <Toaster />
      {/* Sidebar overlay para móvil */}
      <div className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`fixed z-50 top-0 left-0 h-full w-64 md:w-64 transition-transform duration-300 ease-in-out bg-[#15192c] border-r border-[#23263a] md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:block`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>
      {/* Botón de menú hamburguesa solo en móvil, a la derecha y oculto si sidebar está abierto */}
      {!sidebarOpen && (
        <button
          className="fixed top-4 right-4 z-50 p-2 rounded-md bg-[#23263a] text-white md:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu size={24} />
        </button>
      )}
      {/* Contenido principal */}
      <main className="flex-1 p-8 overflow-x-auto md:ml-0 ml-0">
        {children}
      </main>
    </div>
  )
} 