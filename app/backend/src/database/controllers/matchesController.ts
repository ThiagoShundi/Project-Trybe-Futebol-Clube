import { Request, Response } from 'express';
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

  public editFinish = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.matchService.editFinish(id);

      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      console.log(error);
    }
  };

  public edit = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { awayTeamGoals, homeTeamGoals } = req.body;

      await this.matchService.edit(id, awayTeamGoals, homeTeamGoals);

      res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

      const result = await this.matchService
        .create(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

      res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  };
}
