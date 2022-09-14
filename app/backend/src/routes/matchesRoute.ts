import { Router } from 'express'; import MatchesController from '../controllers/MatchesController';

const matchesRoute = Router();

matchesRoute.get('/', MatchesController.getAll);
matchesRoute.post('/', MatchesController.addNewMatch);
matchesRoute.patch('/:id/finish', MatchesController.updateProgress);
matchesRoute.patch('/:id', MatchesController.updateMatch);

export default matchesRoute;
