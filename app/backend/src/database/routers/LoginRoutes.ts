import { Router } from 'express';
import LoginController from '../controllers/loginController';
import validateLogin from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.get('/role', validateToken, (req, res) => loginController.getLogin(req, res));
loginRouter.post('/', validateLogin, (req, res) => loginController.verifyLogin(req, res));

export default loginRouter;
