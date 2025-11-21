import {Response, Request} from 'express';
import { GrupoService } from '../Services/Grupo.Service';

const grupoService = new GrupoService();

export default class GrupoController {
    public async createGrupo(req: Request, res: Response){
        const result = await grupoService.createGrupo(req.body);
        if(result instanceof Error){
            return res.status(400).json({ message: result.message });
        }
        return res.status(201).json(result);
    }

    public async updateGrupo(req: Request, res: Response){
        const result = await grupoService.updateGrupo(Number(req.params.id), req.body);
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async deleteGrupo(req: Request, res: Response){
        const result = await grupoService.deleteGrupo(Number(req.params.id));
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async getGrupoById(req: Request, res: Response) {
        const result = await grupoService.getGrupoById(Number(req.params.id));
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json(result);
    }
        
    public async getAllGrupos(req: Request, res: Response) {
        const result = await grupoService.getAllGrupos();
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json(result);
    }
}