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
      attributes: { exclude: ['id'] },
    },
    {
      model: this.modelTeam,
      as: 'awayTeam',
      attributes: { exclude: ['id'] },
    }],
    });
    return result;
  }

  public async findAllByProgress(inProgress: boolean): Promise<IMatch[]> {
    const result = await this.modelMatch.findAll({ include: [{
      model: this.modelTeam,
      as: 'homeTeam',
      attributes: { exclude: ['id'] },
    },
    {
      model: this.modelTeam,
      as: 'awayTeam',
      attributes: { exclude: ['id'] },
    }],
    where: { inProgress },
    });

    return result;
  }

  public async editFinish(id: string): Promise<void> {
    await this.modelMatch.update({ inProgress: false }, { where: { id } });
  }

  public async edit(id: string, awayTeamGoals: number, homeTeamGoals: number) {
    const result = await this.modelMatch
      .update({ awayTeamGoals, homeTeamGoals }, { where: { id } });

    return result;
  }

  public async create(
    homeTeamId: number,
    awayTeamId: number,
    awayTeamGoals: number,
    homeTeamGoals: number,
  ): Promise<IMatch> {
    const result = await this.modelMatch
      .create({ homeTeamId, awayTeamId, awayTeamGoals, homeTeamGoals, inProgress: true });

    return result;
  }
}
