import { Router } from "express";
import { ZonaController } from "../controllers/Zona.Controller";

const zonaRouter = Router();
const zonaController = new ZonaController();

zonaRouter.get('/', zonaController.getAllZonas);

zonaRouter.get('/:id', zonaController.getZonaById);

zonaRouter.post('/', zonaController.createZona);

zonaRouter.put('/:id', zonaController.updateZona);

zonaRouter.delete('/:id', zonaController.deleteZona);

export default zonaRouter;