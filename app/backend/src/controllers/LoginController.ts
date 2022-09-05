import { Request, Response } from 'express';
import NotFoundError from '../middlewares/NotFoundError';
import LoginService from '../services/loginService';

class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await LoginService.findByEmail(email, password);
    res.status(200).json({ token });
  }

  static async validateAuth(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) {
      throw new NotFoundError('token not found');
    }
    const role = await LoginService.findRole(token);
    res.status(200).json({ role });
  }
}
export default LoginController;
