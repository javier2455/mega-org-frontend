import { Button } from "@/components/ui/button"

export default function Projects() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Proyectos</h1>
        <Button>Nuevo Proyecto</Button>
      </div>

      <div className="rounded-md border">
        <div className="p-4">
          <p className="text-[18px] text-white">
            Módulo en desarrollo 🧑‍💻🧑‍💻.
          </p>
        </div>
      </div>
    </div>
  )
} 