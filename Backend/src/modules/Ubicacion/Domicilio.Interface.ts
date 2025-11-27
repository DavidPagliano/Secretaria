import { LocalidadDto } from "./Localidad.Interface";

export interface DomicilioDto {
    id: number;
    calle: string;
    numero: string;
    localidadId: LocalidadDto[];
    infoExtra?: string;
    codigoPostal?: string;
    Latitud?: number;
    Longitud?: number;
}