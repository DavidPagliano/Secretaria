import {Schema, model} from 'mongoose';
import { ZonaDto } from './Zona.Interface';

const ZonaSchema = new Schema<ZonaDto>({
    id: { type: Number, required: true, unique: true },
    supervision: { type: Schema.Types.ObjectId, ref: 'Supervision', required: true },
    pastores: { type: [{ type: Schema.Types.ObjectId, ref: 'Persona' }] },
    descripcion: { type: String },
    tipoZona: { type: String },
    fechaInicio: { type: Date }
}, {
    timestamps: true,
    versionKey: false
});

export const ZonaModel = model<ZonaDto>('Zona', ZonaSchema);