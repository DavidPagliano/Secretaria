import {Schema, model} from 'mongoose';
import { PersonaDto } from './Persona.Interface';
import { RoleMinisterialList } from '../../shared/enums/role-ministerial.enum';

const PersonaSchema = new Schema<PersonaDto>({
    id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    sexo: { type: String, required: true },
    roleMinisterial: { type: String, enum: RoleMinisterialList, required: true, index: true },    domicilio: { type: Schema.Types.ObjectId, ref: 'Domicilio', required: true },
    telefono: { type: Number, required: true },
    email: { type: String, required: true },
    estadoCivil: { type: String, required: true },
    conyuge: { type: String },
    dni: { type: String, required: true },
    foto: { type: String },
    fechaIngreso: { type: Date },
    fechaBautismo: { type: Date },
    lugarBautismo: { type: String },
    asisteAunGrupo: { type: Boolean, required: true },
    grupo: { type: Schema.Types.ObjectId, ref: 'Grupo' },
    observacion: { type: [{ type: Schema.Types.ObjectId, ref: 'Observacion' }] }
},{
    timestamps: true,
    versionKey: false  
});

export const PersonaModel = model<PersonaDto>('Persona', PersonaSchema);