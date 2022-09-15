import * as jwt from 'jsonwebtoken';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import { IGoal, INewMatch } from '../interfaces/index';
import NotFoundError from '../middlewares/NotFoundError';
import UnauthorizedError from '../middlewares/UnauthorizedError';

const secret = process.env.JWT_SECRET || 'jwt_secret';
class MatchesService {
  static async getAllMatches(): Promise<Matches[]> {
    const matches = await Matches.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
      raw: true,
      nest: true,
    });
    return matches;
  }

  static async updateMatchById(data: IGoal, id: number): Promise<object> {
    const { homeTeamGoals, awayTeamGoals } = data;
    await Matches.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return { message: 'sucessfuly updated!' };
  }

  static async getMatchInProgress(inProgress: boolean):Promise<Matches[]> {
    const matches = await Matches.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
      raw: true,
      nest: true,
      where: { inProgress } });
    return matches;
  }

  static async addNewMatch(data: INewMatch): Promise<Matches | boolean> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = data;
    const checkHomeTeam = await Teams.findOne({ where: { id: homeTeam } });
    const checkAwayTeam = await Teams.findOne({ where: { id: awayTeam } });

    if (!checkHomeTeam || !checkAwayTeam) {
      throw new NotFoundError('There is no team with such id!');
    }
    if (homeTeam === awayTeam) {
      throw new UnauthorizedError('It is not possible to create a match with two equal teams');
    }
    const newMatch = await Matches.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true },
    );
    return newMatch;
  }

  static async updateProgress(id: number): Promise<object> {
    await Matches.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  static async checkToken(token: string) {
    try {
      const { data } = jwt.verify(token, secret) as jwt.JwtPayload;
      return { data };
    } catch (error) {
      if (error) {
        throw new UnauthorizedError('Token must be a valid token');
      }
    }
  }
}

export default MatchesService;
