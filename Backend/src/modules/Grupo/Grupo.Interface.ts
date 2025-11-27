import { DomicilioDto } from "../Ubicacion/Domicilio.Interface";
import { MaestroDto } from "../Maestro/Maestro.Interface";
import { ObservacionDto } from "../../shared/Observaciones/Observacion.Interface";

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