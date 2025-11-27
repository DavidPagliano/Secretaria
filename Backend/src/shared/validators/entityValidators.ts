import { PersonaDto } from "../../modules/Persona/Persona.Interface";
import { GrupoDto } from "../../modules/Grupo/Grupo.Interface";
import { ObservacionDto } from "../Observaciones/Observacion.Interface";
import { MaestroDto } from "../../modules/Maestro/Maestro.Interface";
import { CoordinacionDto } from "../../modules/Coordinacion/Coordinacion.Interface";
import { ZonaDto } from "../../modules/Zona/Zona.Interface";
import { HistorialDto } from "../../modules/Historial/Historial.Interface";
import { SupervisionDto } from "../../modules/Supervision/Supervision,Interface";


export function validatePersonaDto(persona?: PersonaDto): string | null {
    if (!persona) return null;
    if (persona.nombre === undefined || persona.nombre.trim() === '') return "La persona debe tener un nombre asignado";
    if (persona.nombre.length < 5) return "El nombre de la persona debe tener al menos 5 caracteres";
    if (persona.nombre.length > 12) return "El nombre de la persona no debe exceder los 12 caracteres";
    if (persona.apellido === undefined || persona.apellido.trim() === '') return "La persona debe tener un apellido asignado";
    if (persona.apellido.length < 5) return "El apellido de la persona debe tener al menos 5 caracteres";
    if (persona.apellido.length > 14) return "El apellido de la persona no debe exceder los 14 caracteres";
    if (persona.dni !== undefined && persona.dni !== null) {
        if (persona.dni < 1000000 || persona.dni > 99999999) return "El DNI de la persona no es válido";
    }
    if (persona.email && !persona.email.includes("@")) return "El email de la persona no es válido";
    if (persona.telefono && (persona.telefono.toString().length < 8 || persona.telefono.toString().length > 15)) return "El teléfono de la persona no es válido";
    if (persona.foto && !persona.foto.startsWith('http')) return "La foto de la persona no es válida";
    if (persona.fechaBautismo && persona.fechaBautismo > new Date()) return "La fecha de bautismo no puede ser mayor a la fecha actual";
    if (persona.fechaIngreso && persona.fechaIngreso > new Date()) return "La fecha de ingreso no puede ser mayor a la fecha actual";
    if (persona.fechaNacimiento && persona.fechaNacimiento > new Date()) return "La fecha de nacimiento no puede ser mayor a la fecha actual";
    if (persona.observacion) {
        for (const obs of persona.observacion) {
            const r = validateObservacionDto(obs);
            if (r) return r;
        }
    }
    return null;
}

export function validateGrupoDto(grupo?: GrupoDto): string | null {
    if (!grupo) return null;
    if (grupo.titular === undefined || grupo.titular.trim() === '') return "El grupo debe tener un titular asignado";
    if (grupo.titular.length <= 4) return "El nombre del titular debe tener al menos 5 caracteres";
    if (grupo.titular.length > 14) return "El nombre del titular no debe exceder los 14 caracteres";
    if (grupo.dia === undefined || grupo.dia.trim() === '') return "El grupo debe tener un día asignado";
    if (grupo.horario === undefined || grupo.horario.trim() === '') return "El grupo debe tener un horario asignado";
    if (grupo.horario.length < 5) return "El horario asignado no es válido";
    if (grupo.observaciones) {
        for (const o of grupo.observaciones) {
            const r = validateObservacionDto(o);
            if (r) return r;
        }
    }
    return null;
}

export function validateObservacionDto(obs?: ObservacionDto): string | null {
    if (!obs) return null;
    if (!obs.editor || obs.editor.trim() === '') return "La observación debe tener un editor";
    if (!obs.descripcion || obs.descripcion.trim() === '') return "La observación debe tener una descripción";
    if (obs.descripcion.length > 400) return "Las observaciones no deben exceder los 400 caracteres";
    if (!obs.fechaEdicion) return "La observación debe tener una fecha de edición";
    return null;
}

export function validateMaestroDto(maestro?: MaestroDto): string | null {
    if (!maestro) return "No hay datos para crear el maestro";

    // persona
    const p = validatePersonaDto(maestro.persona as PersonaDto);
    if (p) return p;

    if (maestro.estado && maestro.estado !== 'Activo' && maestro.estado !== 'Inactivo') return "El estado del maestro no es válido";
    if (maestro.funcion && maestro.funcion.length > 30) return "La función no debe exceder los 30 caracteres";
    if (maestro.grupoACargo) {
        const g = validateGrupoDto(maestro.grupoACargo as GrupoDto);
        if (g) return g;
    }
    if (maestro.observaciones) {
        if (maestro.observaciones.length > 400) return "Las observaciones no deben exceder los 400 caracteres";
        for (const o of maestro.observaciones) {
            const r = validateObservacionDto(o);
            if (r) return r;
        }
    }
    return null;
}

export function validateCoordinacionDto(coord?: CoordinacionDto): string | null {
    if (!coord) return null;
    if (!coord.maestros || coord.maestros.length === 0) return "La coordinación debe tener al menos un maestro asignado";
    if (!coord.coordinador) return "La coordinación debe tener un coordinador asignado";
    if (!coord.supervision) return "La coordinación debe tener una supervisión asignada";
    if (!coord.fechaInicio) return "La coordinación debe tener una fecha de inicio";
    return null;
}

export function validateZonaDto(zona?: ZonaDto): string | null {
    if (!zona) return null;
    if (!zona.supervision) return "La zona debe tener una supervisión asignada";
    if (zona.pastores && zona.pastores.length === 0) return "La zona debe tener al menos un pastor asignado";
    if (zona.descripcion && zona.descripcion.length > 200) return "La descripción no debe exceder los 200 caracteres";
    if (!zona.tipoZona) return "La zona debe tener un tipo de zona asignado";
    if (zona.tipoZona && zona.tipoZona !== 'Urbana' && zona.tipoZona !== 'Rural') return "El tipo de zona no es válido";
    if (!zona.fechaInicio) return "La zona debe tener una fecha de inicio asignada";
    return null;
}

export function validateHistorialDto(hist?: HistorialDto): string | null {
    if (!hist) return null;
    if (!hist.evento || hist.evento.trim() === '') return "El historial debe tener un evento asignado";
    if (hist.evento.length < 5) return "El nombre del evento debe tener al menos 5 caracteres";
    if (hist.evento.length > 20) return "El nombre del evento no debe exceder los 20 caracteres";
    if (!hist.operador || hist.operador.trim() === '') return "El historial debe tener un operador asignado";
    if (hist.operador.length < 5) return "El nombre del operador debe tener al menos 5 caracteres";
    if (hist.operador.length > 20) return "El nombre del operador no debe exceder los 20 caracteres";
    if (!hist.fecha) return "El historial debe tener una fecha asignada";
    if (hist.zona && hist.zona.length === 0) return "El historial debe tener al menos una zona asignada";
    return null;
}

export function validateSupervisionDto(sup?: SupervisionDto): string | null {
    if (!sup) return null;
    if (!sup.coordinacion || sup.coordinacion.length === 0) return "La supervisión debe tener al menos una coordinación asignada";
    if (!sup.supervisor) return "La supervisión debe tener un supervisor asignado";
    if (!sup.zona) return "La supervisión debe tener una zona asignada";
    if (sup.subzona && sup.subzona.length > 30) return "La subzona no debe exceder los 30 caracteres";
    if (!sup.fechaInicio) return "La supervisión debe tener una fecha de inicio asignada";
    return null;
}
