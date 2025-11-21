import { DomicilioDto } from "./Domicilio.Interface";
import { MaestroDto } from "./Maestro.Interface";
import { ObservacionDto } from "./Observacion.Interface";

export interface GrupoDto {
    id: number;
    titular: string;
    maestro?: MaestroDto[];
    domicilio?: DomicilioDto;
    dia: string;
    horario: string;
    estado?: string;
    observaciones?: ObservacionDto[];
}