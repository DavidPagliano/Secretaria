import { PersonaDto } from "./Persona.Interface";
import { PersonaModel } from "../Persona/Persona.Model";
import { validatePersonaDto, validateObservacionDto } from "../../shared/validators/entityValidators";
import { ObservacionDto } from "../../shared/Observaciones/Observacion.Interface";

export class PersonaService {
    public async createPersona(personaDto: PersonaDto) {
        const validationError = validatePersonaDto(personaDto);
        if (validationError) return new Error(validationError);

        try {
            const newPersona = await PersonaModel.create(personaDto);
            if (!newPersona) return new Error('Error al crear la persona');
            return newPersona;
        } catch (err: any) {
            return new Error(err?.message || 'Error al crear la persona');
        }
    }

    public async updatePersona(id: number, personaDto: Partial<PersonaDto>) {
        if (id == null) return new Error('ID inválido');

        // validar campos proporcionados
        if (personaDto.nombre !== undefined) {
            if (!personaDto.nombre || personaDto.nombre.trim() === '') return new Error('La persona debe tener un nombre asignado');
            if (personaDto.nombre.length < 5) return new Error('El nombre de la persona debe tener al menos 5 caracteres');
            if (personaDto.nombre.length > 12) return new Error('El nombre de la persona no debe exceder los 12 caracteres');
        }
        if (personaDto.apellido !== undefined) {
            if (!personaDto.apellido || personaDto.apellido.trim() === '') return new Error('La persona debe tener un apellido asignado');
            if (personaDto.apellido.length < 5) return new Error('El apellido de la persona debe tener al menos 5 caracteres');
            if (personaDto.apellido.length > 14) return new Error('El apellido de la persona no debe exceder los 14 caracteres');
        }
        if (personaDto.dni !== undefined) {
            if (personaDto.dni == null) return new Error('La persona debe tener un DNI asignado');
            if (personaDto.dni < 1000000 || personaDto.dni > 99999999) return new Error('El DNI de la persona no es válido');
        }
        if (personaDto.fechaNacimiento !== undefined) {
            if (!personaDto.fechaNacimiento) return new Error('La persona debe tener una fecha de nacimiento asignada');
            if (personaDto.fechaNacimiento > new Date()) return new Error('La fecha de nacimiento no puede ser mayor a la fecha actual');
        }
        if (personaDto.email !== undefined) {
            if (personaDto.email && !personaDto.email.includes('@')) return new Error('El email de la persona no es válido');
        }
        if (personaDto.telefono !== undefined) {
            if (personaDto.telefono && (personaDto.telefono.toString().length < 8 || personaDto.telefono.toString().length > 15)) return new Error('El teléfono de la persona no es válido');
        }
        if (personaDto.foto !== undefined) {
            if (personaDto.foto && !personaDto.foto.startsWith('http')) return new Error('La foto de la persona no es válida');
        }
        if (personaDto.observacion !== undefined) {
            for (const obs of personaDto.observacion as ObservacionDto[]) {
                const oErr = validateObservacionDto(obs);
                if (oErr) return new Error(oErr);
            }
        }

        try {
            const updatedPersona = await PersonaModel.findByIdAndUpdate(id, personaDto, { new: true });
            if (!updatedPersona) return new Error('Error al actualizar la persona');
            if (updatedPersona.id !== id) return new Error('El ID de la persona no coincide');
            return updatedPersona;
        } catch (err: any) {
            return new Error(err?.message || 'Error al actualizar la persona');
        }
    }

    public async deletePersona(id: number) {
        if (id == null) return new Error('ID inválido');
        try {
            const deletedPersona = await PersonaModel.findByIdAndDelete(id);
            if (!deletedPersona) return new Error('Error al eliminar la persona');
            if (deletedPersona.id !== id) return new Error('El ID de la persona no coincide');
            return deletedPersona;
        } catch (err: any) {
            return new Error(err?.message || 'Error al eliminar la persona');
        }
    }

    public async getPersonaById(id: number) {
        if (id == null) return new Error('ID inválido');
        try {
            const persona = await PersonaModel.findById(id);
            if (!persona) return new Error('Persona no encontrada');
            if (persona.id !== id) return new Error('El ID de la persona no coincide');
            return persona;
        } catch (err: any) {
            return new Error(err?.message || 'Error al obtener la persona');
        }
    }

    public async getAllPersonas() {
        try {
            const personas = await PersonaModel.find();
            if (!personas || personas.length === 0) return new Error('No hay personas en la base de datos');
            return personas;
        } catch (err: any) {
            return new Error(err?.message || 'Error al obtener las personas');
        }
    }
}