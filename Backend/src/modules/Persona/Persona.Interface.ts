import { DomicilioDto } from "../Ubicacion/Domicilio.Interface";
import { GrupoDto } from "../Grupo/Grupo.Interface";
import { ObservacionDto } from "../../shared/Observaciones/Observacion.Interface";
import { RoleMinisterial } from "../../shared/enums/role-ministerial.enum";
export interface PersonaDto {
    id: number;
    nombre: string;
    apellido: string;
    sexo?: string;
    roleMinisterial?: RoleMinisterial;
    fechaNacimiento?: Date;
    nacionalidad?: string;
    domicilio?: DomicilioDto[];
    telefono?: number;
    email?: string;
    estadoCivil?: string;
    conyuge?: string;
    dni?: number;
    foto?: string;
    fechaIngreso?: Date;
    fechaBautismo?: Date;
    lugarBautismo?: string;
    asisteAunGrupo?: boolean;
    grupo?: GrupoDto;
    observacion?: ObservacionDto[];
}