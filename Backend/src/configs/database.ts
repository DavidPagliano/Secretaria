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
        const db = await mongoose.connect(config.mongo_uri);

        const dbName = db.connection.db?.databaseName;
        console.log(`✅ Conectado a: ${dbName}`);

        const existing = await db.connection.db?.listCollections().toArray();

        const collections = await db.connection.db?.listCollections().toArray();
        collections?.forEach(c => console.log("📂", c.name));
        const names = existing?.map(c => c.name) || [];

        console.log("📦 Colecciones actuales:", names);

        const expected = [
            'grupos',
            'maestros',
            'personas',
            'coordinaciones',
            'supervisiones',
            'zonas',
            'historiales',
            'domicilios',
            'localidades',
            'observaciones'
        ];

        const missing = expected.filter(name => !names.includes(name));

        /* ---- Crear colecciones que no existan ---- */
        if (missing.length > 0) {
            console.log(`🚧 Creando: ${missing.join(', ')}`);

            if (missing.includes('grupos')) await GrupoModel.init();
            if (missing.includes('maestros')) await MaestroModel.init();
            if (missing.includes('personas')) await PersonaModel.init();
            if (missing.includes('coordinaciones')) await CoordinacionModel.init();
            if (missing.includes('supervisiones')) await SupervisionModel.init();
            if (missing.includes('zonas')) await ZonaModel.init();
            if (missing.includes('historiales')) await HistorialModel.init();
            if (missing.includes('domicilios')) await DomicilioModel.init();
            if (missing.includes('localidads')) await LocalidadModel.init();
            if (missing.includes('observaciones')) await ObservacionModel.init();
        } else {
            console.log(`✅ Todas las colecciones ya existen en ${dbName}`);
        }

        /* ---- Verificar si tienen data o están vacías ---- */
        console.log(`\n📊 Estado de las colecciones en ${dbName}:\n`);

        const collectionStatus = [];

        for (const name of expected) {
            const exists = (existing || []).some(c => c.name === name);

            let count = 0;

            if (exists) {
                count = await db.connection.db
                    ?.collection(name)
                    .countDocuments() || 0;
            }

            collectionStatus.push({
                Colección: name,
                Existe: exists ? '✅ Sí' : '❌ No',
                Estado: exists
                    ? count > 0
                        ? '✅ Con datos'
                        : '📭 Vacía'
                    : '—',
                Registros: exists ? count : '—'
            });
        }

        console.table(collectionStatus);

        console.log("\n✅ MongoDB listo y verificado");

    } catch (error) {
        console.error(error);
    }
}