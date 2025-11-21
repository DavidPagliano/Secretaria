export enum RoleMinisterial {
  Maestro = 'Maestro',
  Coordinador = 'Coordinador',
  Supervisor = 'Supervisor',
  PastorZona = 'PastorZona',
}

export const RoleMinisterialList = Object.values(RoleMinisterial) as RoleMinisterial[];

export const RoleMinisterialMeta: Record<RoleMinisterial, { id: number; nombre: RoleMinisterial; descripcion?: string; }> = {
    [RoleMinisterial.Maestro]: { id: 1, nombre: RoleMinisterial.Maestro, descripcion: "El maestro es el encargado de enseñar y guiar a los miembros en su crecimiento espiritual." },
    [RoleMinisterial.Coordinador]: {
        id: 2,
        nombre: RoleMinisterial.Coordinador,
        descripcion: "El coordinador supervisa y apoya a los maestros en sus funciones."
    },
    [RoleMinisterial.Supervisor]: {
        id: 3,
        nombre:RoleMinisterial.Supervisor,
        descripcion: "El supervisor tiene la responsabilidad de supervisar las actividades y el desempeño de los coordinadores." 
    },
    [RoleMinisterial.PastorZona]: {
        id: 4,
        nombre: RoleMinisterial.PastorZona,
        descripcion: "El pastor de zona es responsable de supervisar y guiar a las iglesias dentro de una zona geográfica específica."
    }
};