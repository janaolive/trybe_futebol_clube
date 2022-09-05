import NotFoundError from '../middlewares/NotFoundError';
import Teams from '../database/models/teams';

class TeamsService {
  static async findAll(): Promise<Teams[]> {
    const teams = await Teams.findAll({ attributes: { include: ['id', 'teamName'] } });
    return teams;
  }

  static async findById(id: number): Promise<Teams> {
    const team = await Teams.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundError('invalid id');
    }
    return team;
  }
}

export default TeamsService;
