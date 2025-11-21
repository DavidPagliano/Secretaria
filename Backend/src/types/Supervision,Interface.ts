import { CoordinacionDto } from "./Coordinacion.Interface";
import { PersonaDto } from "./Persona.Interface";
import { ZonaDto } from "./Zona.Interface";

export interface SupervisionDto {
    id: number;
    coordinacion: CoordinacionDto[];
    supervisor: PersonaDto;
    zona?: ZonaDto;
    subzona?: string;
    fechaInicio?: Date;
}