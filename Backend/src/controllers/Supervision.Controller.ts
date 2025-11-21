import {Request, Response} from 'express';
import { SupervisionService } from '../Services/Supervision.Service';

const supervisionService = new SupervisionService();
export default class SupervisionController {
    public async createSupervision(req: Request, res: Response) {
            const result = await supervisionService.createSupervision(req.body);
            if (result instanceof Error) {
                return res.status(400).json({ message: result.message });
            }
            return res.status(201).json(result);
        }
    
        public async updateSupervision(req: Request, res: Response) {
            const result = await supervisionService.updateSupervision(Number(req.params.id), req.body);
            if (result instanceof Error) {
                return res.status(400).json({ message: result.message });
            }
            return res.status(200).json(result);
        }
    
        public async deleteSupervision(req: Request, res: Response) {
            const result = await supervisionService.deleteSupervision(Number(req.params.id));
            if (result instanceof Error) {
                return res.status(400).json({ message: result.message });
            }
            return res.status(200).json(result);
        }
    
        public async getSupervisionById(req: Request, res: Response) {
            const result = await supervisionService.getSupervisionById(Number(req.params.id));
            if (result instanceof Error) {
                return res.status(404).json({ message: result.message });
            }
            return res.status(200).json(result);
        }
        
        public async getAllSupervisiones(req: Request, res: Response) {
            const result = await supervisionService.getAllSupervisiones();
            if (result instanceof Error) {
                return res.status(404).json({ message: result.message });
            }
            return res.status(200).json(result);
        }
}