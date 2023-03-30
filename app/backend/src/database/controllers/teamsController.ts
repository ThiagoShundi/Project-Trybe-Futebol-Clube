import { Request, Response } from 'express';
import TeamService from '../services/teamsService';

export default class TeamController {
  constructor(private teamService = new TeamService()) { }

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const teams = await this.teamService.findAll();

      res.status(200).json(teams);
    } catch (error) {
      console.log(error);
    }
  };

  public findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const teams = await this.teamService.findById(id);

      res.status(200).json(teams);
    } catch (error) {
      console.log(error);
    }
  };
}
