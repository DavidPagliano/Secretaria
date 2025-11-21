import { Router } from 'express';
import MaestroCoontroller from '../controllers/Maestro.Controller';

const maestroRouter = Router();
const maestroController = new MaestroCoontroller();

maestroRouter.get('/', maestroController.getAllMaestros);

maestroRouter.get('/:id', maestroController.getMaestroById)

maestroRouter.post('/', maestroController.createMaestro)

maestroRouter.put('/:id', maestroController.updateMaestro)

maestroRouter.delete('/:id', maestroController.deleteMaestro)

export default maestroRouter;