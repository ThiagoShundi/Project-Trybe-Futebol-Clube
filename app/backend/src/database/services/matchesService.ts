import Matches from '../models/Matches';
import Teams from '../models/Teams';
import IMatch from '../Interfaces/IMatch';

export default class MatchService {
  public modelMatch;
  public modelTeam;

  constructor() {
    this.modelMatch = Matches;
    this.modelTeam = Teams;
  }

  public async findAll(): Promise<IMatch[]> {
    const result = await this.modelMatch.findAll({ include: [{
      model: this.modelTeam,
      as: 'homeTeam',
    },
    {
      model: this.modelTeam,
      as: 'awayTeam',
    }],
    });
    return result;
  }

  public async findAllByProgress(inProgress: string): Promise<IMatch[]> {
    const result = await this.modelMatch.findAll({ include: [{
      model: this.modelTeam,
      as: 'homeTeam',
    },
    {
      model: this.modelTeam,
      as: 'awayTeam',
    }],
    where: { inProgress },
    });

    return result;
  }

//   public async findById(id: string): Promise<IMatch | null> {
//     const result = await this.model.findByPk(id);
//     return result;
//   }
}
