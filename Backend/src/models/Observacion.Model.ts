import {Schema, model} from 'mongoose';
import { ObservacionDto } from '../types/Observacion.Interface';

const ObservacionSchema = new Schema<ObservacionDto>({
    id: { type: Number, required: true, unique: true },
    editor: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaEdicion: { type: Date, required: true }
},
{
    timestamps: true,
    versionKey: false
});

export const ObservacionModel = model<ObservacionDto>('Observacion', ObservacionSchema);