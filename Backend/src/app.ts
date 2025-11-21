import express, { Express, Response } from 'express';
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

import coordinacionRouter from './routes/Coordinacion.route';
import grupoRouter from './routes/Grupo.route';
import historialRouter from './routes/Historial.route';
import maestroRouter from './routes/Maestro.route';
import personaRouter from './routes/Persona.route';
import supervisionRouter from './routes/Supervision.route';
import zonaRouter from './routes/Zona.route';

const app: Express = express();

dotenv.config();
app.use(express.json);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors);

app.use('/coordinacion', coordinacionRouter);
app.use('/grupo', grupoRouter);
app.use('/historial', historialRouter);
app.use('/maestro', maestroRouter);
app.use('/persona', personaRouter);
app.use('/supervision', supervisionRouter);
app.use('/zona', zonaRouter);

app.get('/', (req, res: Response) => {
    res.status(200).send({
      message: `Server is up ✅ - Environment: 3000` ,
      welcome: 'Welcome to the system',
      error: false,
    });
});

export default app;