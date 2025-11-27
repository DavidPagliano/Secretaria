import { Request, Response } from "express";
import { ZonaService } from "./Zona.Service";

const zonaService = new ZonaService();

export class ZonaController {
    public async createZona(req: Request, res: Response) {
        const result = await zonaService.createZona(req.body);
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(201).json(result);
    }

    public async updateZona(req: Request, res: Response) {
        const result = await zonaService.updateZona(Number(req.params.id), req.body);
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async deleteZona(req: Request, res: Response) {
        const result = await zonaService.deleteZona(Number(req.params.id));
        if (result instanceof Error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async getZonaById(req: Request, res: Response) {
        const result = await zonaService.getZonaById(Number(req.params.id));
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json(result);
    }

    public async getAllZonas(req: Request, res: Response) {
        const result = await zonaService.getAllZonas();
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json(result);
    }
}