import { generarTareas } from './taskSimulator';

export const casosPrueba = [
  {
    nombre: 'Caso simple',
    tareas: generarTareas(3, { porcentajeAltaPrioridad: 0.33, porcentajeDependencias: 0 }),
    probabilidadError: 0.1
  },
  {
    nombre: 'Caso con dependencias',
    tareas: generarTareas(5, { porcentajeAltaPrioridad: 0.4, porcentajeDependencias: 0.5 }),
    probabilidadError: 0.2
  },
  {
    nombre: 'Caso complejo',
    tareas: generarTareas(10, { porcentajeAltaPrioridad: 0.3, porcentajeDependencias: 0.4, maxDependencias: 3 }),
    probabilidadError: 0.3
  }
];
