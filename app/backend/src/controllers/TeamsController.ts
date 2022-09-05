import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

class TeamsController {
  static async getAll(req: Request, res: Response) {
    const teams = await TeamsService.findAll();
    res.status(200).json(teams);
  }

  static async getById(req: Request, res: Response) {
    const idTeam = req.params.id;
    const idNumber = Number(idTeam);
    const team = await TeamsService.findById(idNumber);
    res.status(200).json(team);
  }
}
export default TeamsController;
