import { Router } from 'express';
import MatchController from '../controllers/matchesController';
import validateToken from '../middlewares/validateToken';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', (req, res) => matchController.findAll(req, res));
matchRouter.patch('/:id/finish', validateToken, (req, res) => matchController.editFinish(req, res));
matchRouter.patch('/:id', validateToken, (req, res) => matchController.edit(req, res));
matchRouter.post('/', validateToken, (req, res) => matchController.create(req, res));

export default matchRouter;
