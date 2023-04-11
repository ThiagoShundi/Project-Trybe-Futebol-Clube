import { Request, Response } from 'express';
// import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  // constructor(private leaderboardService = new LeaderboardService()) { }

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // const leaderboard = await this.leaderboardService.findAll();
      // res.status(200).json(leaderboard);

      res.status(200).json();
    } catch (error) {
      console.log(error);
    }
  };
}
