import { MaestroDto } from "./Maestro.Interface";
import { MaestroModel } from "../Maestro/Maestro.Model";
import { PersonaModel } from "../Persona/Persona.Model";
import { GrupoModel } from "../Grupo/Grupo.Model";
import { CoordinacionModel } from "../Coordinacion/Coordinacion.Model";
import { SupervisionModel } from "../Supervision/Supervision.Model";
import { ZonaModel } from "../Zona/Zona.Model";
import { ObservacionModel } from "../../shared/Observaciones/Observacion.Model";
import { PersonaDto } from "../Persona/Persona.Interface";
import { GrupoDto } from "../Grupo/Grupo.Interface";
import { ObservacionDto } from "../../shared/Observaciones/Observacion.Interface";
import { validateMaestroDto, validatePersonaDto, validateGrupoDto, validateObservacionDto } from "../../shared/validators/entityValidators";

export class MaestroService {
    public async createMaestro(maestroDto: MaestroDto) {
        // Validar entrada y sub-entidades antes de persistir
        const validationError = validateMaestroDto(maestroDto);
        if (validationError) {
            return new Error(validationError);
        }

        // Resolver/crear las referencias relacionadas antes de crear el Maestro
        // Persona
        let personaRef: (PersonaDto & { _id?: any }) | null = null;
        if (maestroDto.persona) {
            const personaId = (maestroDto.persona as any).id;
            if (personaId !== undefined && personaId !== null) {
                personaRef = await PersonaModel.findOne({ id: personaId }) as (PersonaDto & { _id?: any }) | null;
            }
            if (!personaRef) {
                personaRef = await PersonaModel.create(maestroDto.persona as PersonaDto) as (PersonaDto & { _id?: any });
            }
        }

        // Grupos a cargo (puede ser un solo objeto o null)
        let grupoRefs: any[] | undefined = undefined;
        if (maestroDto.grupoACargo) {
            const gDto: GrupoDto = maestroDto.grupoACargo as GrupoDto;
            let grupoDoc = await GrupoModel.findOne({ id: gDto.id }) as (GrupoDto & { _id?: any }) | null;
            if (!grupoDoc) {
                grupoDoc = await GrupoModel.create(gDto) as (GrupoDto & { _id?: any });
            }
            if (grupoDoc) grupoRefs = [grupoDoc._id];
        }

        // Coordinación
        let coordinacionRefs: any[] | undefined = undefined;
        if (maestroDto.coordinacion) {
            const cDto: any = maestroDto.coordinacion;
            let coordDoc = await CoordinacionModel.findOne({ id: cDto.id }) as (any) | null;
            if (!coordDoc) {
                coordDoc = await CoordinacionModel.create(cDto);
            }
            if (coordDoc) coordinacionRefs = [coordDoc._id];
        }

        // Supervisión
        let supervisionRefs: any[] | undefined = undefined;
        if (maestroDto.supervision) {
            const sDto: any = maestroDto.supervision;
            let sDoc = await SupervisionModel.findOne({ id: sDto.id }) as (any) | null;
            if (!sDoc) {
                sDoc = await SupervisionModel.create(sDto);
            }
            if (sDoc) supervisionRefs = [sDoc._id];
        }

        // Zona
        let zonaRefs: any[] | undefined = undefined;
        if (maestroDto.zona) {
            const zDto: any = maestroDto.zona;
            let zDoc = await ZonaModel.findOne({ id: zDto.id }) as (any) | null;
            if (!zDoc) {
                zDoc = await ZonaModel.create(zDto);
            }
            if (zDoc) zonaRefs = [zDoc._id];
        }

        // Observaciones
        let observacionRefs: any[] | undefined = undefined;
        if (maestroDto.observaciones) {
            observacionRefs = [];
            for (const o of maestroDto.observaciones as ObservacionDto[]) {
                const obsErr = validateObservacionDto(o);
                if (obsErr) return new Error(obsErr);
                let oDoc = await ObservacionModel.findOne({ id: o.id }) as (ObservacionDto & { _id?: any }) | null;
                if (!oDoc) {
                    oDoc = await ObservacionModel.create(o) as (ObservacionDto & { _id?: any });
                }
                if (oDoc) observacionRefs.push(oDoc._id);
            }
        }

        const maestroToSave: any = {
            id: maestroDto.id,
            persona: personaRef?._id || undefined,
            estado: maestroDto.estado ?? 'Activo',
            fechaLLamamiento: maestroDto.fechaLLamamiento,
            funcion: maestroDto.funcion,
            grupoACargo: grupoRefs,
            coordinacion: coordinacionRefs,
            supervision: supervisionRefs,
            zona: zonaRefs,
            observaciones: observacionRefs
        };

        try {
            const newMaestro = await MaestroModel.create(maestroToSave);
            if (!newMaestro) {
                return new Error("Error al crear el maestro");
            }
            return newMaestro;
        } catch (err: any) {
            return new Error(err?.message || 'Error al crear el maestro');
        }
    }

    public async updateMaestro(id: number, maestroDto: Partial<MaestroDto>) {
        if (id == null) return new Error('ID inválido');

        // Validar campos proporcionados
        if (maestroDto.persona !== undefined) {
            const pErr = validatePersonaDto(maestroDto.persona as PersonaDto);
            if (pErr) return new Error(pErr);
        }
        if (maestroDto.grupoACargo !== undefined) {
            const gErr = validateGrupoDto(maestroDto.grupoACargo as GrupoDto);
            if (gErr) return new Error(gErr);
        }
        if (maestroDto.observaciones !== undefined) {
            for (const o of maestroDto.observaciones as ObservacionDto[]) {
                const oErr = validateObservacionDto(o);
                if (oErr) return new Error(oErr);
            }
        }
        if (maestroDto.estado !== undefined) {
            if (maestroDto.estado != 'Activo' && maestroDto.estado != 'Inactivo') {
                return new Error("El estado del maestro no es válido");
            }
        }
        if (maestroDto.funcion !== undefined) {
            if (maestroDto.funcion && maestroDto.funcion.length > 30) {
                return new Error("La función no debe exceder los 30 caracteres");
            }
        }

        const updatedMaestro = await MaestroModel.findByIdAndUpdate(id, maestroDto, { new: true });
        if (!updatedMaestro) {
            return new Error("Error al actualizar el maestro");
        }
        if (updatedMaestro.id !== id) {
            return new Error("El ID del maestro no coincide");
        }

        return updatedMaestro;
    } 

    public async deleteMaestro(id: number) {
        if (id == null) return new Error('ID inválido');
        const deletedMaestro = await MaestroModel.findByIdAndDelete(id);

        if (!deletedMaestro) {
            return new Error("Error al eliminar el maestro");
        }
        if(deletedMaestro?.id !== id){
            return new Error("El ID del maestro no coincide");
        }

        return deletedMaestro;
    }

    public async getMaestroById(id: number) {
        if (id == null) return new Error('ID inválido');
        const maestro = await MaestroModel.findById(id);
        if (!maestro) {
            return new Error("Maestro no encontrado");
        }

        if(maestro.id !== id){
            return new Error("El ID del maestro no coincide");
        }

        return maestro;
    }

    public async getAllMaestros() {
        const maestros = await MaestroModel.find();
        if (!maestros || maestros.length === 0) return new Error('No hay maestros en la base de datos');
        return maestros;
    }
}