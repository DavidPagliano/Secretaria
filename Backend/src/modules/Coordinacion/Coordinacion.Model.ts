import {Schema, model} from 'mongoose';
import { CoordinacionDto } from './Coordinacion.Interface';

const CoordinacionSchema = new Schema<CoordinacionDto>({
    id: { type: Number, required: true, unique: true },
    maestros: { type: [{ type: Schema.Types.ObjectId, ref: 'Maestro' }], required: true },
    coordinador: { type: Schema.Types.ObjectId, ref: 'Persona' },
    supervision: { type: Schema.Types.ObjectId, ref: 'Supervision' },
    fechaInicio: { type: Date }
},{
    timestamps: true,
    versionKey: false
})
export const CoordinacionModel = model<CoordinacionDto>('Coordinacion', CoordinacionSchema);