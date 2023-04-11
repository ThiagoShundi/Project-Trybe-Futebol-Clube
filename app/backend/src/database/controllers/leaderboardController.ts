import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  public findAllHome = async (req: Request, res: Response): Promise<void> => {
    try {
      const leaderboard = await this.leaderboardService.findAllHome();

      res.status(200).json(leaderboard);
    } catch (error) {
      console.log(error);
    }
  };
}
