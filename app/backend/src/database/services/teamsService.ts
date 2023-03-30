import Teams from '../models/Teams';
import ITeam from '../Interfaces/ITeam';

export default class TeamService {
  public model;

  constructor() {
    this.model = Teams;
  }

  public async findAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async findById(id: string): Promise<ITeam | null> {
    const result = await this.model.findByPk(id);
    return result;
  }
}
