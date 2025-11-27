import {Schema, model} from 'mongoose';
import { HistorialDto } from './Historial.Interface';

const HistorialSchema = new Schema<HistorialDto>({
    id: { type: Number, required: true, unique: true },
    evento: { type: String, required: true },
    fecha: { type: Date, required: true },
    operador: { type: String, required: true },
    zona: { type: [{ type: Schema.Types.ObjectId, ref: 'Zona' }], required: true }
},{
    timestamps: true,
    versionKey: false
});

export const HistorialModel = model<HistorialDto>('Historial', HistorialSchema);