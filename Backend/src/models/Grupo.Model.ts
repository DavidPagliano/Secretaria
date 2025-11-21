import {Schema, model} from 'mongoose';
import { GrupoDto } from '../types/Grupo.Interface';

const GrupoSchema = new Schema<GrupoDto>({
    id: { type: Number, required: true, unique: true },
    titular: { type: String, required: true },
    maestro: { type: [{ type: Schema.Types.ObjectId, ref: 'Maestro' }] },
    domicilio: { type: Schema.Types.ObjectId, ref: 'Domicilio' },
    dia: { type: String, required: true },
    horario: { type: String, required: true },
    estado: { type: String },
    observaciones: { type: [{ type: Schema.Types.ObjectId, ref: 'Observacion' }] }
},{
    timestamps: true,
    versionKey: false
});

export const GrupoModel = model<GrupoDto>('Grupo', GrupoSchema);