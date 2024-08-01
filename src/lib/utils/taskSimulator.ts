interface Task {
  id: number;
  prioridad: 'alta' | 'baja';
  dependencias: number[];
}

export function crearSimuladorTareas(probabilidadError = 0.2) {
  const tiempoEjecucion = () => Math.floor(Math.random() * 1000) + 500; // Entre 500ms y 1500ms

  return async function ejecutarTarea(tarea: Task): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, tiempoEjecucion()));
    
    if (Math.random() < probabilidadError) {
      throw new Error(`Error al ejecutar la tarea ${tarea.id}`);
    }
    
    return `Tarea ${tarea.id} completada`;
  };
}

export function generarTareas(cantidad: number, configuracion: {
  porcentajeAltaPrioridad?: number,
  porcentajeDependencias?: number,
  maxDependencias?: number
} = {}): Task[] {
  const {
    porcentajeAltaPrioridad = 0.3,
    porcentajeDependencias = 0.3,
    maxDependencias = 2
  } = configuracion;

  const tareas: Task[] = [];
  for (let i = 1; i <= cantidad; i++) {
    tareas.push({
      id: i,
      prioridad: Math.random() < porcentajeAltaPrioridad ? 'alta' : 'baja',
      dependencias: []
    });
  }
  
  // Añadir dependencias aleatorias
  for (let i = 2; i <= cantidad; i++) {
    if (Math.random() < porcentajeDependencias) {
      const numDependencias = Math.floor(Math.random() * maxDependencias) + 1;
      for (let j = 0; j < numDependencias; j++) {
        const dependencia = Math.floor(Math.random() * (i - 1)) + 1;
        if (!tareas[i-1].dependencias.includes(dependencia)) {
          tareas[i-1].dependencias.push(dependencia);
        }
      }
    }
  }
  
  return tareas;
}