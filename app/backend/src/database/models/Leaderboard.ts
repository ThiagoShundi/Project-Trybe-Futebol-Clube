import IMatch from '../Interfaces/IMatch';
import ITeam from '../Interfaces/ITeam';
import ILeaderboard from '../Interfaces/ILeaderboard';

class Leaderboard implements ILeaderboard {
  declare name: string;
  declare totalGames: number;
  declare totalPoints: number;
  declare totalVictories: number;
  declare totalDraws: number;
  declare totalLosses: number;
  declare goalsFavor: number;
  declare goalsOwn: number;
  declare goalsBalance: number;
  declare efficiency: number;
  declare _team: ITeam;
  declare _matches: IMatch[];

  constructor(team: ITeam, matches: IMatch[]) {
    this._matches = matches;
    this._team = team;
    this.name = this._team.teamName;
    this.totalVictories = this.victories();
    this.totalDraws = this.draws();
    this.totalLosses = this.losses();
    this.totalGames = this.totalVictories + this.totalDraws + this.totalLosses;
    this.totalPoints = this.totalVictories * 3 + this.totalDraws;
    this.goalsFavor = this.homeGoalsFavor();
    this.goalsOwn = this.homeGoalsOwn();
    this.efficiency = Number(this.homeEfficiency().toFixed(2));
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  victories(): number {
    const victories = this._matches.reduce((acc, cur) => {
      if (cur.homeTeamId === this._team.id && !cur.inProgress
        && cur.homeTeamGoals > cur.awayTeamGoals) { return acc + 1; }

      return acc;
    }, 0);

    return victories;
  }

  draws(): number {
    const draws = this._matches.reduce((acc, cur) => {
      if (cur.homeTeamId === this._team.id && !cur.inProgress
      && cur.homeTeamGoals === cur.awayTeamGoals) { return acc + 1; }

      return acc;
    }, 0);

    return draws;
  }

  losses(): number {
    const losses = this._matches.reduce((acc, cur) => {
      if (cur.homeTeamId === this._team.id && !cur.inProgress
      && cur.homeTeamGoals < cur.awayTeamGoals) { return acc + 1; }

      return acc;
    }, 0);

    return losses;
  }

  homeGoalsFavor(): number {
    const goalsFavor = this._matches.reduce((acc, cur) => {
      if (cur.homeTeamId === this._team.id
        && !cur.inProgress) { return acc + cur.homeTeamGoals; }

      return acc;
    }, 0);

    return goalsFavor;
  }

  homeGoalsOwn(): number {
    const goalsFavor = this._matches.reduce((acc, cur) => {
      if (cur.homeTeamId === this._team.id
        && !cur.inProgress) { return acc + cur.awayTeamGoals; }

      return acc;
    }, 0);

    return goalsFavor;
  }

  homeEfficiency(): number {
    const efficiency = (this.totalPoints / (this.totalGames * 3)) * 100;

    return efficiency;
  }

  findAll() {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }
}

export default Leaderboard;
