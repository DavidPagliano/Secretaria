import {Schema, model} from 'mongoose';
import { MaestroDto } from '../types/Maestro.Interface';

const MaestroSchema = new Schema<MaestroDto>({
    id: { type: Number, required: true, unique: true },
    persona: { type: Schema.Types.ObjectId, ref: 'Persona', required: true },
    estado: { type: String, required: true },
    fechaLLamamiento: { type: Date },
    grupoACargo: { type: [{ type: Schema.Types.ObjectId, ref: 'Grupo' }] },
    coordinacion: { type: [{ type: Schema.Types.ObjectId, ref: 'Coordinacion' }] },
    supervision: { type: [{ type: Schema.Types.ObjectId, ref: 'Supervision' }] },
    zona: { type: [{ type: Schema.Types.ObjectId, ref: 'Zona' }] },
    observaciones: { type: [{ type: Schema.Types.ObjectId, ref: 'Observacion' }] }
},
{
    timestamps: true,
    versionKey: false
});

export const MaestroModel = model<MaestroDto>('Maestro', MaestroSchema);