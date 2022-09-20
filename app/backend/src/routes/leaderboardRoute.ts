import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/home', LeaderboardController.getAllHome);
leaderboardRoute.get('/away', LeaderboardController.getAllAway);
leaderboardRoute.get('/', LeaderboardController.getAll);

export default leaderboardRoute;
