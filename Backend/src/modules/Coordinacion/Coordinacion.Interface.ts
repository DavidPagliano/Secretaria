import { MaestroDto } from "./Maestro.Interface";
import { PersonaDto } from "./Persona.Interface";
import { SupervisionDto } from "./Supervision,Interface";

export interface CoordinacionDto {
    id: number;
    maestros: MaestroDto[];
    coordinador?: PersonaDto;
    supervision?: SupervisionDto;
    fechaInicio?: Date;
}