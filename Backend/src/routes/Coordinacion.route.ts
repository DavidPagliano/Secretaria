import { Router } from "express";
import CoordinacionController  from "../controllers/Coordinacion.Controller";

const coordinacionRouter = Router();
const coordinacionController = new CoordinacionController();

//GET -http://localhost:3000/coordinacion/
coordinacionRouter.get('/', coordinacionController.getAllCoordinaciones);

//GET - http://localhost:3000/coordinacion/:id
coordinacionRouter.get('/:id', coordinacionController.getCoordinacionById);

coordinacionRouter.post('/', coordinacionController.createCoordinacion);

coordinacionRouter.put('/:id', coordinacionController.updateCoordinacion);

coordinacionRouter.delete('/:id', coordinacionController.deleteCoordinacion);

export default coordinacionRouter;