import { GrupoDto } from "../types/Grupo.Interface";
import { GrupoModel } from "../models/Grupo.Model";
import { MaestroModel } from "../models/Maestro.Model";
import { validateGrupoDto } from "../shared/validators/entityValidators";
import { MaestroDto } from "../types/Maestro.Interface";

export class GrupoService {
    public async createGrupo(grupoDto: GrupoDto) {
        const validationError = validateGrupoDto(grupoDto);
        if (validationError) return new Error(validationError);

        // maestros (refs)
        let maestroRefs: any[] | undefined = undefined;
        if (grupoDto.maestro) {
            maestroRefs = [];
            for (const m of grupoDto.maestro as MaestroDto[]) {
                let mDoc = await MaestroModel.findOne({ id: (m as any).id }) as (MaestroDto & { _id?: any }) | null;
                if (!mDoc) mDoc = await MaestroModel.create(m as MaestroDto) as (MaestroDto & { _id?: any });
                if (mDoc) maestroRefs.push(mDoc._id);
            }
        }

        const toSave: any = {
            id: grupoDto.id,
            titular: grupoDto.titular,
            maestro: maestroRefs,
            domicilio: (grupoDto as any).domicilio,
            dia: grupoDto.dia,
            horario: grupoDto.horario,
            estado: grupoDto.estado,
            observaciones: grupoDto.observaciones
        };

        try {
            const newGrupo = await GrupoModel.create(toSave);
            return newGrupo;
        } catch (err: any) {
            return new Error(err?.message || 'Error al crear el grupo');
        }
    }

    public async updateGrupo(id: number, grupoDto: Partial<GrupoDto>) {
        if (id == null) return new Error('ID inválido');
        if (grupoDto.titular !== undefined) {
            if (!grupoDto.titular || grupoDto.titular.length <= 4) return new Error('El nombre del titular debe tener al menos 5 caracteres');
            if (grupoDto.titular.length > 14) return new Error('El nombre del titular no debe exceder los 14 caracteres');
        }
        if (grupoDto.maestro !== undefined) {
            if (grupoDto.maestro && grupoDto.maestro.length === 0) return new Error('El grupo debe tener al menos un maestro asignado');
        }
        if (grupoDto.domicilio !== undefined) {
            if (!grupoDto.domicilio) return new Error('El grupo debe tener un domicilio asignado');
        }
        if (grupoDto.dia !== undefined) {
            if (!grupoDto.dia || grupoDto.dia.trim() === '') return new Error('El grupo debe tener un día asignado');
        }
        if (grupoDto.horario !== undefined) {
            if (!grupoDto.horario || grupoDto.horario.length < 5) return new Error('El horario asignado no es válido');
            const hour = parseInt(grupoDto.horario.split(':')[0]);
            if (isNaN(hour) || hour < 8 || hour > 20) return new Error('El horario asignado debe estar entre 08:00 y 20:00');
        }
        if (grupoDto.estado !== undefined) {
            if (grupoDto.estado != 'Activo' && grupoDto.estado != 'Inactivo') return new Error('El estado del grupo no es válido');
        }
        if (grupoDto.observaciones !== undefined) {
            if (grupoDto.observaciones && grupoDto.observaciones.length > 400) return new Error('Las observaciones no deben exceder los 400 caracteres');
        }

        const updatedGrupo = await GrupoModel.findByIdAndUpdate(id, grupoDto, { new: true });
        if (!updatedGrupo) return new Error('Error al actualizar el grupo');
        if (updatedGrupo.id !== id) return new Error('El ID del grupo no coincide');
        return updatedGrupo;
    }

    public async deleteGrupo(id: number) {
        if (id == null) return new Error('ID inválido');
        const deletedGrupo = await GrupoModel.findByIdAndDelete(id);
        if (!deletedGrupo) return new Error('Error al eliminar el grupo');
        if (deletedGrupo.id !== id) return new Error('El ID del grupo no coincide');
        return deletedGrupo;
    }

    public async getGrupoById(id: number) {
        if (id == null) return new Error('ID inválido');
        const grupo = await GrupoModel.findById(id);
        if (!grupo) return new Error('Grupo no encontrado');
        if (grupo.id !== id) return new Error('El ID del grupo no coincide');
        return grupo;
    }
    
    public async getAllGrupos() {
        const grupos = await GrupoModel.find();
        if (!grupos || grupos.length === 0) return new Error('No hay grupos en la base de datos');
        return grupos;
    }
}