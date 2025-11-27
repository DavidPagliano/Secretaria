import {Schema, model} from 'mongoose';
import { LocalidadDto } from './Localidad.Interface';

const LocalidadSchema = new Schema<LocalidadDto>({
    id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    provincia: { type: String, required: true },
    pais: { type: String, required: true },
},{
    timestamps: true,
    versionKey: false
});

export const LocalidadModel = model<LocalidadDto>('Localidades', LocalidadSchema);