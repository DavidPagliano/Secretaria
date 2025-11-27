import express, { Express, Response } from 'express';
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import os from 'os';
import { ROUTES } from './common/route-map';
import { config } from './configs/config'
import { DOCS } from './common/docs';

import coordinacionRouter from './modules/Coordinacion/Coordinacion.route';
import grupoRouter from './modules/Grupo/Grupo.route';
import historialRouter from './modules/Historial/Historial.route';
import maestroRouter from './modules/Maestro/Maestro.route';
import personaRouter from './modules/Persona/Persona.route';
import supervisionRouter from './modules/Supervision/Supervision.route';
import zonaRouter from './modules/Zona/Zona.route';

const app: Express = express();
dotenv.config();
const ACCEPTED_ORIGINS = [
  String(config.port_backend),
  String(config.port_frontend)
]


app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {

    if (ACCEPTED_ORIGINS.includes(origin!)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true) 
    }
    return callback(new Error('Not allowed by CORS'))
  }
}));

app.use(ROUTES.coordinacion, coordinacionRouter);
app.use(ROUTES.grupo, grupoRouter);
app.use(ROUTES.historial, historialRouter);
app.use(ROUTES.maestro, maestroRouter);
app.use(ROUTES.persona, personaRouter);
app.use(ROUTES.supervision, supervisionRouter);
app.use(ROUTES.zona, zonaRouter);

app.get('/', (req, res: Response) => {
    res.status(200).send({
      message: `Server is up ✅` ,
      enviroment: process.env.NODE_ENV || "DEV",
      welcome: 'Welcome to the system',
      error: false,
      availableRoutes: Object.values(ROUTES)
    });
});

app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "CONNECTED ✅" : "DISCONNECTED ❌";

  res.status(200).json({
    status: "OK",
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});


app.get('/info', (req, res) => {
  res.status(200).json({
    app: "Secretaria API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "DEV",
    author: "David Pagliano",
    serverTime: new Date().toISOString(),
    platform: os.platform(),
    nodeVersion: process.version
  });
});

app.get('/docs', (req, res) => {
  res.status(200).json({
    title: "📚 API Documentation",
    version: process.env.npm_package_version || "1.0.0",
    modules: DOCS
  });
});

app.get('/version', (req, res) => {
  res.json({
    app: "Secretaria API",
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV || "DEV"
  });
});

export default app;