import { ZonaDto } from "../types/Zona.Interface";
import { ZonaModel } from "../models/Zona.Model";
import { SupervisionModel } from "../models/Supervision.Model";
import { PersonaModel } from "../models/Persona.Model";
import { validateZonaDto } from "../shared/validators/entityValidators";
import { PersonaDto } from "../types/Persona.Interface";

export class ZonaService {
    public async createZona(zonaDto: ZonaDto) {
        const validationError = validateZonaDto(zonaDto);
        if (validationError) return new Error(validationError);

        // resolver supervision
        let supervisionRef: any[] | undefined = undefined;
        if (zonaDto.supervision) {
            const sDto: any = zonaDto.supervision;
            let sDoc = await SupervisionModel.findOne({ id: sDto.id }) as any | null;
            if (!sDoc) sDoc = await SupervisionModel.create(sDto);
            if (sDoc) supervisionRef = [sDoc._id];
        }

        // pastores -> personas
        let pastoresRefs: any[] | undefined = undefined;
        if (zonaDto.pastores) {
            pastoresRefs = [];
            for (const p of zonaDto.pastores as PersonaDto[]) {
                let pDoc = await PersonaModel.findOne({ id: (p as any).id }) as (PersonaDto & { _id?: any }) | null;
                if (!pDoc) pDoc = await PersonaModel.create(p as PersonaDto) as (PersonaDto & { _id?: any });
                if (pDoc) pastoresRefs.push(pDoc._id);
            }
        }

        const toSave: any = {
            id: zonaDto.id,
            supervision: supervisionRef,
            pastores: pastoresRefs,
            descripcion: zonaDto.descripcion,
            tipoZona: zonaDto.tipoZona,
            fechaInicio: zonaDto.fechaInicio
        };

        try {
            const newZona = await ZonaModel.create(toSave);
            return newZona;
        } catch (err: any) {
            return new Error(err?.message || 'Error al crear la zona');
        }
    }

    public async updateZona(id: number, zonaDto: Partial<ZonaDto>) {
        if (id == null) return new Error('ID inválido');
        if (zonaDto.supervision !== undefined) {
            if (!zonaDto.supervision) return new Error('La zona debe tener una supervisión asignada');
        }
        if (zonaDto.pastores !== undefined) {
            if (zonaDto.pastores && zonaDto.pastores.length === 0) return new Error('La zona debe tener al menos un pastor asignado');
        }
        if (zonaDto.descripcion !== undefined) {
            if (zonaDto.descripcion && zonaDto.descripcion.length > 200) return new Error('La descripción no debe exceder los 200 caracteres');
        }
        if (zonaDto.tipoZona !== undefined) {
            if (!zonaDto.tipoZona) return new Error('La zona debe tener un tipo de zona asignado');
            if (zonaDto.tipoZona !== 'Urbana' && zonaDto.tipoZona !== 'Rural') return new Error('El tipo de zona no es válido');
        }
        if (zonaDto.fechaInicio !== undefined) {
            if (!zonaDto.fechaInicio) return new Error('La zona debe tener una fecha de inicio asignada');
        }

        const updatedZona = await ZonaModel.findByIdAndUpdate(id, zonaDto, { new: true });
        if (!updatedZona) return new Error('Error al actualizar la zona');
        if (updatedZona.id !== id) return new Error('El ID de la zona no coincide');
        return updatedZona;
    }

    public async deleteZona(id: number) {
        if (id == null) return new Error('ID inválido');
        const deletedZona = await ZonaModel.findByIdAndDelete(id);
        if (!deletedZona) return new Error('Error al eliminar la zona');
        if (deletedZona.id !== id) return new Error('El ID de la zona no coincide');
        return deletedZona;
    }

    public async getZonaById(id: number) {
        if (id == null) return new Error('ID inválido');
        const zona = await ZonaModel.findById(id);
        if (!zona) return new Error('Zona no encontrada');
        if (zona.id !== id) return new Error('El ID de la zona no coincide');
        return zona;
    }

    public async getAllZonas() {
        const zonas = await ZonaModel.find();
        if (!zonas || zonas.length === 0) return new Error('No hay zonas en la base de datos');
        return zonas;
    }
}