import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  static async getAll(req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getAll();
    res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
