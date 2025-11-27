import mongoose from "mongoose";
import {config} from './config'
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
        await mongoose.connect(config.mongo_uri)
        .then(async (db) => {
            console.clear();
            console.log({ level: 'info', message: '✅ Database '+ db.connection.db?.databaseName +' connected'});
            // Obtener las colecciones existentes
            const existingCollections = await db.connection.db?.listCollections().toArray();
            const existingCollectionNames = existingCollections?.map(collection => collection.name) || [];

            // Lista de colecciones esperadas
            const expectedCollections = ['Grupo', 'Maestro', 'Persona', 'Coordinacion', 'Supervision', 'Zona', 'Historial', 'Domicilio','Localidad','Observaciones'];

            // Determine which expected collections are missing in the database
            const missingCollection = expectedCollections.filter(name => !existingCollectionNames.includes(name));

            if(missingCollection.length < 0) {
                console.log({ level: 'info', message: '✅ Todas las colecciones ya existen en: ' + db.connection.db?.databaseName });
            } else {
                console.log({ level: 'info', message: 'Creando colecciones faltantes en ' + db.connection.db?.databaseName });

                if(missingCollection.includes('Grupo')) await GrupoModel.createCollection();
                if(missingCollection.includes('Maestro')) await MaestroModel.createCollection();
                if(missingCollection.includes('Persona')) await PersonaModel.createCollection();
                if(missingCollection.includes('Coordinacion')) await CoordinacionModel.createCollection();
                if(missingCollection.includes('Supervision')) await SupervisionModel.createCollection();
                if(missingCollection.includes('Zona')) await ZonaModel.createCollection();
                if(missingCollection.includes('Historial')) await HistorialModel.createCollection();
                if(missingCollection.includes('Domicilio')) await DomicilioModel.createCollection();
                if(missingCollection.includes('Localidad')) await LocalidadModel.createCollection();
                if(missingCollection.includes('Observaciones')) await ObservacionModel.createCollection();
            }
        })
         console.log("MongoDB is connected");
    } catch (error) {
        console.error(error);
    }
}