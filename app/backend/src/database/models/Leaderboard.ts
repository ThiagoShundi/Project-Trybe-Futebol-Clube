import IMatch from '../Interfaces/IMatch';
import ITeam from '../Interfaces/ITeam';

class Leaderboard {
  declare _name: string;
  declare _totalGames: number;
  declare _totalPoints: number;
  declare _totalVictories: number;
  declare _totalDraws: number;
  declare _totalLosses: number;
  declare _goalsFavor: number;
  declare _goalsOwn: number;
  declare _goalsBalance: number;
  declare _efficiency: number;
  declare _team: ITeam;
  declare _matches: IMatch[];

  constructor(team: ITeam, matches: IMatch[]) {
    this._matches = matches;
    this._team = team;
    this._name = this._team.teamName;
    this._totalVictories = this.victories();
  }

  victories(): number {
    const victories = this._matches.reduce((acc, cur) => {
      if (cur.homeTeamId === this._team.id && !cur.inProgress
        && cur.homeTeamGoals > cur.awayTeamGoals) { return acc + 1; }

      return acc;
    }, 0);

    return victories;
  }

  findAll() {
    return { name: this._name, totalVictories: this._totalVictories };
  }
}

export default Leaderboard;
