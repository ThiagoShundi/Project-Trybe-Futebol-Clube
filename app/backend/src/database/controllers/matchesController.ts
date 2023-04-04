import { Request, Response } from 'express';
// import { ConsoleMessage } from 'puppeteer';
import MatchService from '../services/matchesService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public findAll = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;

      if (inProgress === 'true') {
        const convertBoolTrue = true;
        const matches = await this.matchService.findAllByProgress(convertBoolTrue);

        return res.status(200).json(matches);
      }
      if (inProgress === 'false') {
        const convertBoolFalse = false;
        const matches = await this.matchService.findAllByProgress(convertBoolFalse);

        return res.status(200).json(matches);
      }
      const matches = await this.matchService.findAll();

      return res.status(200).json(matches);
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
