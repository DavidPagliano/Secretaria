import { Router } from "express";
import PersonaController from "./Persona.Controller";

const personaRouter = Router();
const personaController = new PersonaController();

personaRouter.get('/', personaController.getAllPersonaes)

personaRouter.get('/:id', personaController.getPersonaById)

personaRouter.post('/', personaController.createPersona)

personaRouter.put('/:id', personaController.updatePersona)

personaRouter.delete('/:id', personaController.deletePersona)

export default personaRouter;