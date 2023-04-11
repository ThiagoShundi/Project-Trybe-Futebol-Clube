import Matches from '../models/Matches';
import Teams from '../models/Teams';
import ILeaderboard from '../Interfaces/ILeaderboard';
import Leaderboard from '../models/Leaderboard';

export default class LeaderboardService {
  private _teamModel;
  private _matchModel;

  constructor() {
    this._teamModel = Teams;
    this._matchModel = Matches;
  }

  public async findAllHome(): Promise<ILeaderboard[]> {
    const teams = await this._teamModel.findAll();
    const matches = await this._matchModel.findAll();

    const perfomance = teams.map((team) => {
      const mat = (matches.filter((match) => match.homeTeamId === team.id));

      const home = new Leaderboard(team, mat);

      return home.findAll();
    });

    return perfomance;
  }
}
