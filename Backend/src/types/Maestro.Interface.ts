import { CoordinacionDto } from "./Coordinacion.Interface";
import { GrupoDto } from "./Grupo.Interface";
import { ObservacionDto } from "./Observacion.Interface";
import { PersonaDto } from "./Persona.Interface";
import { SupervisionDto } from "./Supervision,Interface";
import { ZonaDto } from "./Zona.Interface";

export interface MaestroDto{
    id: number;
    persona: PersonaDto;
    estado?: string;
    fechaLLamamiento?: Date;
    funcion?: string;
    grupoACargo?: GrupoDto;
    coordinacion?: CoordinacionDto;
    supervision?: SupervisionDto;
    zona?: ZonaDto;
    observaciones?: ObservacionDto[];
}