import { CoordinacionDto } from "../Coordinacion/Coordinacion.Interface";
import { GrupoDto } from "../Grupo/Grupo.Interface";
import { ObservacionDto } from "../../shared/Observaciones/Observacion.Interface";
import { PersonaDto } from "../Persona/Persona.Interface";
import { SupervisionDto } from "../Supervision/Supervision,Interface";
import { ZonaDto } from "../Zona/Zona.Interface";

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