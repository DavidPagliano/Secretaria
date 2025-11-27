import { CoordinacionDto } from "./Coordinacion.Interface";
import { CoordinacionModel } from "./Coordinacion.Model";
import { MaestroModel } from "../Maestro/Maestro.Model";
import { PersonaModel } from "../Persona/Persona.Model";
import { SupervisionModel } from "../Supervision/Supervision.Model";
import { validateCoordinacionDto } from "../../shared/validators/entityValidators";
import { MaestroDto } from "../Maestro/Maestro.Interface";
import { PersonaDto } from "../Persona/Persona.Interface";

export class CoordinacionService {
    public async createCoordinacion(coordinacionDto: CoordinacionDto) {
        const validationError = validateCoordinacionDto(coordinacionDto);
        if (validationError) return new Error(validationError);

        // resolver maestros (array)
        const maestrosRefs: any[] = [];
        if (coordinacionDto.maestros) {
            for (const m of coordinacionDto.maestros as MaestroDto[]) {
                let mDoc = await MaestroModel.findOne({ id: (m as any).id }) as (MaestroDto & { _id?: any }) | null;
                if (!mDoc) {
                    mDoc = await MaestroModel.create(m as MaestroDto) as (MaestroDto & { _id?: any });
                }
                if (mDoc) maestrosRefs.push(mDoc._id);
            }
        }

        // coordinador
        let coordRef: (PersonaDto & { _id?: any }) | null = null;
        if (coordinacionDto.coordinador) {
            const pid = (coordinacionDto.coordinador as any).id;
            if (pid !== undefined && pid !== null) coordRef = await PersonaModel.findOne({ id: pid }) as (PersonaDto & { _id?: any }) | null;
            if (!coordRef) coordRef = await PersonaModel.create(coordinacionDto.coordinador as PersonaDto) as (PersonaDto & { _id?: any });
        }

        // supervision
        let supervisionRef: any[] | undefined = undefined;
        if (coordinacionDto.supervision) {
            const sDto: any = coordinacionDto.supervision;
            let sDoc = await SupervisionModel.findOne({ id: sDto.id }) as any | null;
            if (!sDoc) sDoc = await SupervisionModel.create(sDto);
            if (sDoc) supervisionRef = [sDoc._id];
        }

        const toSave: any = {
            id: coordinacionDto.id,
            maestros: maestrosRefs,
            coordinador: coordRef?._id || undefined,
            supervision: supervisionRef,
            fechaInicio: coordinacionDto.fechaInicio
        };

        try {
            const newCoordinacion = await CoordinacionModel.create(toSave);
            return newCoordinacion;
        } catch (err: any) {
            return new Error(err?.message || 'Error al crear la coordinación');
        }
    }

    public async updateCoordinacion(id: number, coordinacionDto: Partial<CoordinacionDto>) {
        if (id == null) return new Error('ID inválido');
        if (coordinacionDto.maestros !== undefined) {
            // basic check
            if (!coordinacionDto.maestros || coordinacionDto.maestros.length === 0) return new Error('La coordinación debe tener al menos un maestro asignado');
        }
        if (coordinacionDto.coordinador !== undefined) {
            if (!coordinacionDto.coordinador) return new Error('La coordinación debe tener un coordinador asignado');
        }
        if (coordinacionDto.supervision !== undefined) {
            if (!coordinacionDto.supervision) return new Error('La coordinación debe tener una supervisión asignada');
        }
        if (coordinacionDto.fechaInicio !== undefined) {
            if (!coordinacionDto.fechaInicio) return new Error('La coordinación debe tener una fecha de inicio');
        }

        const updated = await CoordinacionModel.findByIdAndUpdate(id, coordinacionDto, { new: true });
        if (!updated) return new Error('Error al actualizar la coordinación');
        if (updated.id !== id) return new Error('El ID de la coordinación no coincide');
        return updated;
    }

    public async deleteCoordinacion(id: number) {
        if (id == null) return new Error('ID inválido');
        const deletedCoordinacion = await CoordinacionModel.findByIdAndDelete(id);
        if (!deletedCoordinacion) {
            return new Error("Error al eliminar la coordinación");
        }
        return deletedCoordinacion;
    }

    public async getCoordinacionById(id: number) {
        if (id == null) return new Error('ID inválido');
        const coordinacion = await CoordinacionModel.findById(id);
        if (!coordinacion) {
            return new Error("Coordinación no encontrada");
        }
        if (coordinacion.id !== id) return new Error('El ID de la coordinación no coincide');
        return coordinacion;
    }

    public async getAllCoordinaciones() {
        const coordinaciones = await CoordinacionModel.find();
        if (!coordinaciones || coordinaciones.length === 0) return new Error('No hay coordinaciones en la base de datos');
        return coordinaciones;
    }
}