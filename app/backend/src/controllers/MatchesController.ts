import { Request, Response } from 'express';
import UnauthorizedError from '../middlewares/UnauthorizedError';
import MatchesService from '../services/matchesService';

class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const progressMatches = await MatchesService.getMatchProgress(inProgress === 'true');
      res.status(200).json(progressMatches);
    }
    const matches = await MatchesService.getAll();
    res.status(200).json(matches);
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const numberId = Number(id);
    const matchChanged = await MatchesService.updateMatch(req.body, numberId);
    res.status(200).json(matchChanged);
  }

  static async addNewMatch(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedError('Token must be a valid token');
    }
    const token = await MatchesService.checkToken(authorization);
    if (token) {
      const newMatch = await MatchesService.addNewMatch(req.body);
      res.status(200).json(newMatch);
    }
  }

  static async updateProgress(req: Request, res: Response) {
    const { id } = req.params;
    const matchId = Number(id);
    const message = await MatchesService.updateProgress(matchId);
    res.status(200).json(message);
  }
}

export default MatchesController;
