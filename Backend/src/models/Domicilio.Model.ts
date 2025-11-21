import {Schema, model} from 'mongoose';
import { DomicilioDto } from '../types/Domicilio.Interface';

const DomicilioSchema = new Schema<DomicilioDto>({
    id: { type: Number, required: true, unique: true },
    calle: { type: String, required: true },
    numero: { type: String, required: true },
    localidadId: { type: [{ type: Schema.Types.ObjectId, ref: 'Localidad' }], required: true },
    infoExtra: { type: String },
    codigoPostal: { type: String },
    Latitud: { type: Number },
    Longitud: { type: Number }
},{
    timestamps: true,
    versionKey: false
});
export const DomicilioModel = model<DomicilioDto>('Domicilio', DomicilioSchema);