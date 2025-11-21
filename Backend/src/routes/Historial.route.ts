import { Router } from "express";
import HistorialController from "../controllers/Historial.Controller";

const historialRouter = Router();
const historialController = new HistorialController();

historialRouter.get('/', historialController.getAllHistorial)

historialRouter.get('/:id', historialController.getHistorialId)

historialRouter.post('/', historialController.createHistorial)

historialRouter.put('/:id', historialController.updateHistorial)

historialRouter.delete('/:id', historialController.deleteHistorial)

export default historialRouter;