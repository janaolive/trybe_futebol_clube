import { Router } from 'express'; import MatchesController from '../controllers/MatchesController';

const matchesRoute = Router();

matchesRoute.get('/', MatchesController.getAll);
matchesRoute.post('/', MatchesController.addMatch);
matchesRoute.patch('/:id/finish', MatchesController.setProgress);
matchesRoute.patch('/:id', MatchesController.updateMatch);

export default matchesRoute;
