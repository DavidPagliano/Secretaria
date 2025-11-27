import { Response, Request } from 'express';
import { PersonaService } from './Persona.Service';

const personaService = new PersonaService();
export default class PersonaController {
    public async createPersona(req: Request, res: Response) {
        const result = await personaService.createPersona(req.body);
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(201).json(result);
    }

    public async updatePersona(req: Request, res: Response) {
        const result = await personaService.updatePersona(Number(req.params.id), req.body);
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async deletePersona(req: Request, res: Response) {
        const result = await personaService.deletePersona(Number(req.params.id));
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async getPersonaById(req: Request, res: Response) {
        const result = await personaService.getPersonaById(Number(req.params.id));
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async getAllPersonaes(req: Request, res: Response) {
        const result = await personaService.getAllPersonas();
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json(result);
    }
}