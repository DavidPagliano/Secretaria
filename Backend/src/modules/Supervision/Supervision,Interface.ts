import { CoordinacionDto } from "../Coordinacion/Coordinacion.Interface";
import { PersonaDto } from "../Persona/Persona.Interface";
import { ZonaDto } from "../Zona/Zona.Interface";

export interface SupervisionDto {
    id: number;
    coordinacion: CoordinacionDto[];
    supervisor: PersonaDto;
    zona?: ZonaDto;
    subzona?: string;
    fechaInicio?: Date;
}