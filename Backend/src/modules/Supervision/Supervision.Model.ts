import {Schema, model} from 'mongoose';
import { SupervisionDto } from './Supervision,Interface';

const SupervisionSchema = new Schema<SupervisionDto>({
    id: { type: Number, required: true, unique: true },
    coordinacion: { type: [{ type: Schema.Types.ObjectId, ref: 'Coordinacion' }], required: true },
    supervisor: { type: Schema.Types.ObjectId, ref: 'Persona', required: true },
    zona: { type: [{ type: Schema.Types.ObjectId, ref: 'Zona' }], required: true },
    subzona: { type: [{ type: String, required: true }] },
    fechaInicio: { type: Date, required: true }
},{
    timestamps: true,
    versionKey: false
});

export const SupervisionModel = model<SupervisionDto>('Supervision', SupervisionSchema);