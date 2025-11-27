import { Router } from "express";
import SupervisionController from "./Supervision.Controller";

const supervisionRouter = Router();
const suvpervisionController = new SupervisionController();

supervisionRouter.get('/', suvpervisionController.getAllSupervisiones);

supervisionRouter.get('/:id', suvpervisionController.getSupervisionById);

supervisionRouter.post('/', suvpervisionController.createSupervision);

supervisionRouter.put('/:id', suvpervisionController.updateSupervision);

supervisionRouter.delete('/:id', suvpervisionController.deleteSupervision);

export default supervisionRouter;
