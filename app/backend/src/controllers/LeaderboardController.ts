import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  static async getAll(req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getAll();
    res.status(200).json(leaderboard);
  }

  static async getAllAway(req: Request, res: Response) {
    const awayTeams = await LeaderboardService.getAllAway();
    res.status(200).json(awayTeams);
  }

  // static async getAllHome(req: Request, res: Response) {
  //   const homeTeams = await LeaderboardService.getAllHome();
  //   res.status(200).json(homeTeams);
  // }
}

export default LeaderboardController;
