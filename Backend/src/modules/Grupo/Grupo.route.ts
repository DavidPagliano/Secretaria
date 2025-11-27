import { Router } from "express";
import GrupoController from "./Grupo.Controller";

const grupoRouter = Router();
const grupoController = new GrupoController();

grupoRouter.get('/', grupoController.getAllGrupos);

grupoRouter.get('/:id', grupoController.getGrupoById);

grupoRouter.post('/', grupoController.createGrupo);

grupoRouter.put('/:id', grupoController.updateGrupo);

grupoRouter.delete('/:id', grupoController.deleteGrupo);

export default grupoRouter;