import { Router } from 'express'; import MatchesController from '../controllers/MatchesController';

const matchesRoute = Router();

matchesRoute.get('/', MatchesController.getMatches);
matchesRoute.post('/', MatchesController.addNewMatch);
matchesRoute.patch('/:id/finish', MatchesController.setProgress);
matchesRoute.patch('/:id', MatchesController.changeMatch);

export default matchesRoute;
