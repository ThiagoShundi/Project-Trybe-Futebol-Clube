import { Router } from 'express';
import TeamController from '../controllers/teamsController';

const teamRouter = Router();

const teamController = new TeamController();

teamRouter.get('/', (req, res) => teamController.findAll(req, res));
teamRouter.get('/:id', (req, res) => teamController.findById(req, res));

export default teamRouter;
