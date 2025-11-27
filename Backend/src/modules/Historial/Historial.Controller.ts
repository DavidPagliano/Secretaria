import {Response, Request} from 'express';
import { HistorialService } from './Historial.Service';

const historialService = new HistorialService();
export default class HistorialController {
    public async createHistorial(req: Request, res: Response) {
        const result = await historialService.createHistorial(req.body);
        if(result instanceof Error){
            return res.status(400).json({ message: result.message })
        }
        return res.status(201).json(result);
    }

    public async updateHistorial(req: Request, res: Response){
        const result = await historialService.updateHistorial(Number(req.params.id), req.body);
        if(result instanceof Error){
            return res.status(400).json({ message: result.message })
        }
        return res.status(200).json(result);
    }

    public async deleteHistorial(req: Request, res: Response){
        const result = await historialService.deleteHistorial(Number(req.params.id));
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async getHistorialId(req:Request, res: Response){
        const result = await historialService.getHistorialById(Number(req.params.id));
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async getAllHistorial(req:Request, res: Response){
        const result = await historialService.getAllHistorials();
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json(result);
    }
}