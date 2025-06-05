export function translateBadge(label: string) {
  switch (label) {
    /* TASK STATUS */
    case 'new':
      return 'Nuevo';
    case 'pending':
      return 'Pendiente';
    case 'in_progress':
      return 'En progreso';
    case 'completed':
      return 'Completado';
    case 'in_review':
      return 'En revisión';
    case 'done':
      return 'Finalizado';
    /* TASK PRIORITY */
    case 'low':
      return 'Bajo';
    case 'medium':
      return 'Medio';
    case 'high':
      return 'Alto';
    case 'critical':
      return 'Crítico';
    /* USER ROLE */
    case 'user':
      return 'Usuario';
    case 'admin':
      return 'Administrador';
    case 'maintainer':
      return 'Mantenedor';
    default:
      return label;
  }
}
