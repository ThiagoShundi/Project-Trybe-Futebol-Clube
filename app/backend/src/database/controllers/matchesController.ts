import { Request, Response } from 'express';
import MatchService from '../services/matchesService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // const { inProgress } = req.query;

      // if (inProgress !== undefined) {
      //   const matches = await this.matchService.findAllByProgress(inProgress);

      //   res.status(200).json(matches);
      // }

      const matches = await this.matchService.findAll();

      res.status(200).json(matches);
    } catch (error) {
      console.log(error);
    }
  };

  //   public findById = async (req: Request, res: Response): Promise<void> => {
  //     try {
  //       const { id } = req.params;
  //       const teams = await this.teamService.findById(id);

//       res.status(200).json(teams);
//     } catch (error) {
//       console.log(error);
//     }
//   };
}
