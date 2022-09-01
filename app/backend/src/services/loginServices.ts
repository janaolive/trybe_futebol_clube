import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/users';
import BadRequestError from '../middlewares/BadRequestError';
import UnauthorizedError from '../middlewares/UnauthorizedError';
import { Ilogin } from '../interfaces';

const secret = process.env.JWT_SECRET || 'jwt_secret';

class LoginService {
  static async findByEmail(mail: string, password: string): Promise<string> {
    if (!mail || !password) {
      throw new BadRequestError('All fields must be filled');
    }
    const user = await Users.findOne({ where: { email: mail } });
    if (!user) {
      throw new UnauthorizedError('Incorrect email or password');
    }
    const encryptPassword = await bcrypt.compare(password, user.password);
    if (!encryptPassword) {
      throw new UnauthorizedError('Incorrect email or password');
    }
    const { role, id, email } = user;
    const token = jwt.sign({ role, id, email }, secret);
    return token;
  }

  static async findRole(token: string): Promise<string> {
    const decoded = jwt.verify(token, secret) as Ilogin;

    const roleUser = await Users.findOne({ where: { email: decoded.email } });
    if (!roleUser) {
      throw new Error();
    }
    return roleUser.role;
  }
}

export default LoginService;
