import {Response, Request} from 'express';
import { CoordinacionService } from './Coordinacion.Service';

const coordinacionService = new CoordinacionService();
export default class CoordinacionController {
    public async createCoordinacion(req: Request, res: Response) {
        const result = await coordinacionService.createCoordinacion(req.body);
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(201).json(result);
    }

    public async updateCoordinacion(req: Request, res: Response) {
        const result = await coordinacionService.updateCoordinacion(Number(req.params.id), req.body);
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async deleteCoordinacion(req: Request, res: Response) {
        const result = await coordinacionService.deleteCoordinacion(Number(req.params.id));
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async getCoordinacionById(req: Request, res: Response) {
        const result = await coordinacionService.getCoordinacionById(Number(req.params.id));
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async getAllCoordinaciones(req: Request, res: Response) {
        const result = await coordinacionService.getAllCoordinaciones();
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json(result);
    }
}