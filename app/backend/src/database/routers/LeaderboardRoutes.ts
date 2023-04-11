import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

// leaderboardRouter.get('/', (req, res) => leaderboardController.findAll(req, res));
leaderboardRouter.get('/home', (req, res) => leaderboardController.findAllHome(req, res));

export default leaderboardRouter;
