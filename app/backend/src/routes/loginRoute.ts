import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const loginRoute = Router();

loginRoute.post('/', LoginController.login);
loginRoute.get('/validate', LoginController.validateAuth);

export default loginRoute;
