import { PersonaDto } from "../Persona/Persona.Interface";
import { SupervisionDto } from "../Supervision/Supervision,Interface";

export interface ZonaDto {
    id: number;
    supervision?: SupervisionDto[];
    pastores?: PersonaDto[];
    descripcion?: string;
    tipoZona?: string;
    fechaInicio?: Date;
}