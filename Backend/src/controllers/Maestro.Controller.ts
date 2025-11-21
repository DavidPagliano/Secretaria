import {Response, Request} from 'express';
import { MaestroService } from '../Services/Maestro.Service';

const maestroService = new MaestroService();
export default class MaestroCoontroller {
    public async createMaestro(req: Request, res: Response) {
        const result = await maestroService.createMaestro(req.body);
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(201).json(result);
    }

    public async updateMaestro(req: Request, res: Response){
        const result = await maestroService.updateMaestro(Number(req.params.id), req.body);
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async deleteMaestro(req: Request, res: Response){
        const result = await maestroService.deleteMaestro(Number(req.params.id));
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async getMaestroById(req: Request, res: Response) {
        const result = await maestroService.getMaestroById(Number(req.params.id));
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async getAllMaestros(req: Request, res: Response){
        const result = await maestroService.getAllMaestros();
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json(result);
    }
}