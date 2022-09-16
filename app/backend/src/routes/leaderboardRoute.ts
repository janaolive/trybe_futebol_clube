import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/home', LeaderboardController.getAll);
leaderboardRoute.get('/away', LeaderboardController.getAllAway);

export default leaderboardRoute;
