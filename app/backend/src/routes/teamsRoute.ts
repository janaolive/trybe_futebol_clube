import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRoute = Router();

teamsRoute.get('/', TeamsController.getAll);
teamsRoute.get('/:id', TeamsController.getById);

export default teamsRoute;
