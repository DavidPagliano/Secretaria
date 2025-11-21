import { HistorialDto } from "../types/Historial.Interface";
import { HistorialModel } from "../models/Historial.Model";
import { validateHistorialDto } from "../shared/validators/entityValidators";

export class HistorialService {
    public async createHistorial(historialDto: HistorialDto) {
        const validationError = validateHistorialDto(historialDto);
        if (validationError) return new Error(validationError);

        try {
            const newHistorial = await HistorialModel.create(historialDto);
            return newHistorial;
        } catch (err: any) {
            return new Error(err?.message || 'Error al crear el historial');
        }
    }

    public async updateHistorial(id: number, historialDto: Partial<HistorialDto>) {
        if (id == null) return new Error('ID inválido');
        if (historialDto.evento !== undefined) {
            if (!historialDto.evento || historialDto.evento.length < 5) return new Error('El nombre del evento debe tener al menos 5 caracteres');
            if (historialDto.evento.length > 20) return new Error('El nombre del evento no debe exceder los 20 caracteres');
        }
        if (historialDto.operador !== undefined) {
            if (!historialDto.operador || historialDto.operador.length < 5) return new Error('El nombre del operador debe tener al menos 5 caracteres');
            if (historialDto.operador.length > 20) return new Error('El nombre del operador no debe exceder los 20 caracteres');
        }
        if (historialDto.fecha !== undefined) {
            if (!historialDto.fecha) return new Error('El historial debe tener una fecha asignada');
        }
        if (historialDto.zona !== undefined) {
            if (historialDto.zona && historialDto.zona.length === 0) return new Error('El historial debe tener al menos una zona asignada');
        }

        const updatedHistorial = await HistorialModel.findByIdAndUpdate(id, historialDto, { new: true });
        if (!updatedHistorial) return new Error('Error al actualizar el historial');
        if (updatedHistorial.id !== id) return new Error('El ID del historial no coincide');
        return updatedHistorial;
    }

    public async deleteHistorial(id:number){
        if(id == null) return new Error('ID invalido');
        const deletehistorial = await HistorialModel.findByIdAndDelete(id);
        if(!deletehistorial) return new Error('Historial no encontrado');
        if(deletehistorial.id !== id) return new Error('El ID del historial no coincide');

        return deletehistorial;
    }

    public async getHistorialById(id: number) {
        if (id == null) return new Error('ID inválido');
        const historial = await HistorialModel.findById(id);
        if (!historial) return new Error('Historial no encontrado');
        if (historial.id !== id) return new Error('El ID del historial no coincide');
        return historial;
    }

    public async getAllHistorials() {
        const historials = await HistorialModel.find();
        if (!historials || historials.length === 0) return new Error('No hay historiales en la base de datos');
        return historials;
    }
}