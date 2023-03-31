import { Router } from 'express';
import LoginController from '../controllers/teamsController';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.get('/', (req, res) => loginController.findAll(req, res));
loginRouter.get('/:id', (req, res) => loginController.findById(req, res));

export default loginRouter;
