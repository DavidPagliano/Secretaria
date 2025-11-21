
import { ZonaDto } from "./Zona.Interface";

export interface HistorialDto {
    id: number;
    evento: string;
    fecha: Date;
    operador: string;
    zona: ZonaDto[];
}