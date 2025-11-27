import mongoose from "mongoose";
import { config } from './config'
import { GrupoModel } from "../modules/Grupo/Grupo.Model";
import { MaestroModel } from "../modules/Maestro/Maestro.Model";
import { PersonaModel } from "../modules/Persona/Persona.Model";
import { CoordinacionModel } from "../modules/Coordinacion/Coordinacion.Model";
import { SupervisionModel } from "../modules/Supervision/Supervision.Model";
import { ZonaModel } from "../modules/Zona/Zona.Model";
import { HistorialModel } from "../modules/Historial/Historial.Model";
import { DomicilioModel } from "../modules/Ubicacion/Domicilio.Model";
import { LocalidadModel } from "../modules/Ubicacion/Localidad.Model";
import { ObservacionModel } from "../shared/Observaciones/Observacion.Model";

export const connectDB = async () => {
    try {
        console.log('Uri', config.mongo_uri);
        const db = await mongoose.connect(config.mongo_uri);
        console.clear();
        console.log({ level: 'info', message: '✅ Database ' + db.connection.db?.databaseName + ' connected' });

        const existingCollections = await db.connection.db?.listCollections().toArray();
        const existingCollectionNames = existingCollections?.map(c => c.name) || [];

        const expectedCollections = ['Grupo', 'Maestro', 'Persona', 'Coordinacion', 'Supervision', 'Zona', 'Historial', 'Domicilio', 'Localidad', 'Observaciones'];

        const missingCollections = expectedCollections.filter(name => !existingCollectionNames.includes(name));

        if (missingCollections.length === 0) {
            console.log({ level: 'info', message: '✅ Todas las colecciones ya existen en: ' + db.connection.db?.databaseName });
        } else {
            console.log({ level: 'info', message: `🚧 Creando colecciones faltantes: ${missingCollections.join(', ')}` });

            if (missingCollections.includes('Grupo')) await GrupoModel.createCollection();
            if (missingCollections.includes('Maestro')) await MaestroModel.createCollection();
            if (missingCollections.includes('Persona')) await PersonaModel.createCollection();
            if (missingCollections.includes('Coordinacion')) await CoordinacionModel.createCollection();
            if (missingCollections.includes('Supervision')) await SupervisionModel.createCollection();
            if (missingCollections.includes('Zona')) await ZonaModel.createCollection();
            if (missingCollections.includes('Historial')) await HistorialModel.createCollection();
            if (missingCollections.includes('Domicilio')) await DomicilioModel.createCollection();
            if (missingCollections.includes('Localidad')) await LocalidadModel.createCollection();
            if (missingCollections.includes('Observaciones')) await ObservacionModel.createCollection();
        }
        console.log("MongoDB is connected");
    } catch (error) {
        console.error(error);
    }
}