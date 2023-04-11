import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const createToken = (data: string) => jwt.sign({ data }, secret, {
  algorithm: 'HS256',
  expiresIn: '7d',
});

const verifyToken = (token: string) => jwt.verify(token, secret);

export { createToken, verifyToken };

// this._totalDraws = this.draws();
// this._totalLosses = this.losses();
// this._totalGames = this._totalVictories + this._totalDraws + this._totalLosses;
// this._totalPoints = this._totalVictories * 3 + this._totalDraws;
// this._goalsFavor = this.goalsFavor();
// this._goalsOwn = this.goalsOwn();
// this._goalsBalance = this._goalsFavor - this._goalsOwn;
// this._efficiency = Number(this.efficiency().toFixed(2));

// draws(): number {
//   const draws = this._matches.reduce((acc, cur) => {
//     if (cur.homeTeamId === this._team.id && !cur.inProgress
//       && cur.homeTeamGoals === cur.awayTeamGoals) { return acc + 1; }

//     if (cur.awayTeamId === this._team.id && !cur.inProgress
//         && cur.homeTeamGoals === cur.awayTeamGoals) { return acc + 1; }
//   }, 0);

//   return draws;
// }

// losses(): number {
//   const losses = this._matches.reduce((acc, cur) => {
//     if (cur.homeTeamId === this._team.id && !cur.inProgress
//       && cur.homeTeamGoals < cur.awayTeamGoals) { return acc + 1; }

//     if (cur.awayTeamId === this._team.id && !cur.inProgress
//         && cur.homeTeamGoals > cur.awayTeamGoals) { return acc + 1; }
//   }, 0);

//   return losses;
// }
