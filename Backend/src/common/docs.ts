import { ROUTES } from './route-map';

export const DOCS = [
  {
    module: "Coordinacion",
    base: ROUTES.coordinacion,
    endpoints: [
      { method: "GET", path: "/", description: "Obtener coordinaciones" },
      { method: "GET", path: "/:id", description: "Obtener por id" },
      { method: "POST", path: "/", description: "Crear nueva coordinación" },
      { method: "PUT", path: "/:id", description: "Actualizar" },
      { method: "DELETE", path: "/:id", description: "Eliminar" }
    ]
  },
  {
    module: "Grupo",
    base: ROUTES.grupo,
    endpoints: [
      { method: "GET", path: "/", description: "Obtener grupos" },
      { method: "GET", path: "/:id", description: "Obtener por id" },
      { method: "POST", path: "/", description: "Crear nuevo grupo" },
      { method: "PUT", path: "/:id", description: "Actualizar" },
      { method: "DELETE", path: "/:id", description: "Eliminar" }
    ]
  },
  {
    module: "Persona",
    base: ROUTES.persona,
    endpoints: [
      { method: "GET", path: "/", description: "Obtener personas" },
      { method: "GET", path: "/:id", description: "Obtener por id" },
      { method: "POST", path: "/", description: "Crear nueva persona" },
      { method: "PUT", path: "/:id", description: "Actualizar" },
      { method: "DELETE", path: "/:id", description: "Eliminar" }
    ]
  },
  {
    module: "Maestro",
    base: ROUTES.maestro,
    endpoints: [
      { method: "GET", path: "/", description: "Obtener maestros" },
      { method: "GET", path: "/:id", description: "Obtener por id" },
      { method: "POST", path: "/", description: "Crear nueva maestro" },
      { method: "PUT", path: "/:id", description: "Actualizar" },
      { method: "DELETE", path: "/:id", description: "Eliminar" }
    ]
  },
  {
    module: "Supervision",
    base: ROUTES.supervision,
    endpoints: [
      { method: "GET", path: "/", description: "Obtener supervisiones" },
      { method: "GET", path: "/:id", description: "Obtener por id" },
      { method: "POST", path: "/", description: "Crear nueva supervision" },
      { method: "PUT", path: "/:id", description: "Actualizar" },
      { method: "DELETE", path: "/:id", description: "Eliminar" }
    ]
  },
  {
    module: "Historial",
    base: ROUTES.historial,
    endpoints: [
      { method: "GET", path: "/", description: "Obtener historiales" },
      { method: "GET", path: "/:id", description: "Obtener por id" },
      { method: "POST", path: "/", description: "Crear nueva historial" },
      { method: "PUT", path: "/:id", description: "Actualizar" },
      { method: "DELETE", path: "/:id", description: "Eliminar" }
    ]
  },
  {
    module: "Zona",
    base: ROUTES.zona,
    endpoints: [
      { method: "GET", path: "/", description: "Obtener zonas" },
      { method: "GET", path: "/:id", description: "Obtener por id" },
      { method: "POST", path: "/", description: "Crear nueva zona" },
      { method: "PUT", path: "/:id", description: "Actualizar" },
      { method: "DELETE", path: "/:id", description: "Eliminar" }
    ]
  }
  
];
