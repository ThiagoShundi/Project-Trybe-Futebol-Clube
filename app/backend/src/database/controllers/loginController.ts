import { Request, Response } from 'express';
import * as crypt from 'bcryptjs';
import LoginService from '../services/loginService';
import { createToken } from '../auth/authFunctions';

export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  public verifyLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = req.body;

      const login = await this.loginService.verifyLogin(user);

      if (!login) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      if (!await crypt.compare(user.password, login.password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = createToken(user);

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  public getLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { role } = req.body;

      console.log(req.body);

      res.status(200).json({ role });
    } catch (error) {
      console.log(error);
    }
  };
}
