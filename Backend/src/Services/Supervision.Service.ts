import { SupervisionDto } from "../types/Supervision,Interface";
import { SupervisionModel } from "../models/Supervision.Model";
import { validateSupervisionDto } from "../shared/validators/entityValidators";
import { CoordinacionModel } from "../models/Coordinacion.Model";
import { PersonaModel } from "../models/Persona.Model";
import { ZonaModel } from "../models/Zona.Model";
import { CoordinacionDto } from "../types/Coordinacion.Interface";
import { PersonaDto } from "../types/Persona.Interface";
import { ZonaDto } from "../types/Zona.Interface";

export class SupervisionService {
    public async createSupervision(supervisionDto: SupervisionDto) {
        const validationError = validateSupervisionDto(supervisionDto);
        if (validationError) return new Error(validationError);

        // resolver coordinaciones
        let coordRefs: any[] = [];
        if (supervisionDto.coordinacion) {
            for (const c of supervisionDto.coordinacion as CoordinacionDto[]) {
                let cDoc = await CoordinacionModel.findOne({ id: (c as any).id }) as (CoordinacionDto & { _id?: any }) | null;
                if (!cDoc) cDoc = await CoordinacionModel.create(c as CoordinacionDto) as (CoordinacionDto & { _id?: any });
                if (cDoc) coordRefs.push(cDoc._id);
            }
        }

        // supervisor (persona)
        let supRef: (PersonaDto & { _id?: any }) | null = null;
        if (supervisionDto.supervisor) {
            const pid = (supervisionDto.supervisor as any).id;
            if (pid !== undefined && pid !== null) supRef = await PersonaModel.findOne({ id: pid }) as (PersonaDto & { _id?: any }) | null;
            if (!supRef) supRef = await PersonaModel.create(supervisionDto.supervisor as PersonaDto) as (PersonaDto & { _id?: any });
        }

        // zona
        let zonaRef: any[] | undefined = undefined;
        if (supervisionDto.zona) {
            const zDto: ZonaDto = supervisionDto.zona as ZonaDto;
            let zDoc = await ZonaModel.findOne({ id: zDto.id }) as (ZonaDto & { _id?: any }) | null;
            if (!zDoc) zDoc = await ZonaModel.create(zDto) as (ZonaDto & { _id?: any });
            if (zDoc) zonaRef = [zDoc._id];
        }

        const toSave: any = {
            id: supervisionDto.id,
            coordinacion: coordRefs,
            supervisor: supRef?._id || undefined,
            zona: zonaRef,
            subzona: supervisionDto.subzona,
            fechaInicio: supervisionDto.fechaInicio
        };

        try {
            const newSupervision = await SupervisionModel.create(toSave);
            return newSupervision;
        } catch (err: any) {
            return new Error(err?.message || 'Error al crear la supervisión');
        }
    }

    public async updateSupervision(id: number, supervisionDto: Partial<SupervisionDto>) {
        if (id == null) return new Error('ID inválido');
        if (supervisionDto.coordinacion !== undefined) {
            if (!supervisionDto.coordinacion || supervisionDto.coordinacion.length === 0) return new Error('La supervisión debe tener al menos una coordinación asignada');
        }
        if (supervisionDto.supervisor !== undefined) {
            if (!supervisionDto.supervisor) return new Error('La supervisión debe tener un supervisor asignado');
        }
        if (supervisionDto.zona !== undefined) {
            if (!supervisionDto.zona) return new Error('La supervisión debe tener una zona asignada');
        }
        if (supervisionDto.subzona !== undefined) {
            if (supervisionDto.subzona && supervisionDto.subzona.length > 30) return new Error('La subzona no debe exceder los 30 caracteres');
        }
        if (supervisionDto.fechaInicio !== undefined) {
            if (!supervisionDto.fechaInicio) return new Error('La supervisión debe tener una fecha de inicio asignada');
        }

        const updated = await SupervisionModel.findByIdAndUpdate(id, supervisionDto, { new: true });
        if (!updated) return new Error('Error al actualizar la supervisión');
        if (updated.id !== id) return new Error('El ID de la supervisión no coincide');
        return updated;
    }

    public async deleteSupervision(id: number) {
        if (id == null) return new Error('ID inválido');
        const deletedSupervision = await SupervisionModel.findByIdAndDelete(id);
        if (!deletedSupervision) return new Error('Error al eliminar la supervisión');
        if (deletedSupervision.id !== id) return new Error('El ID de la supervisión no coincide');
        return deletedSupervision;
    }

    public async getSupervisionById(id: number) {
        if (id == null) return new Error('ID inválido');
        const supervision = await SupervisionModel.findById(id);
        if (!supervision) return new Error('Supervisión no encontrada');
        if (supervision.id !== id) return new Error('El ID de la supervisión no coincide');
        return supervision;
    }

    public async getAllSupervisiones() {
        const supervisiones = await SupervisionModel.find();
        if (!supervisiones || supervisiones.length === 0) return new Error('No hay supervisiones en la base de datos');
        return supervisiones;
    }
}