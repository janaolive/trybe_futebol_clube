import sequelize from '../database/models';
import { queryHomeRanking, queryAwayRanking, queryGeneralRanking } from './queries';

class LeaderboardService {
  static async getAllHome() {
    const [homeTeams] = await sequelize.query(queryHomeRanking);
    return homeTeams;
  }

  static async getAllAway() {
    const [awayTeams] = await sequelize.query(queryAwayRanking);
    return awayTeams;
  }

  static async getAll() {
    const [leaderboard] = await sequelize.query(queryGeneralRanking);
    return leaderboard;
  }
}

export default LeaderboardService;
// TROCA DO INNER JOIN POR LEFT JOIN POR MELHOR ASSERTIVIDADE
// INNER JOIN - TABELAS IGUAIS INCLUSIVE QTD DE REGISTROS
// LEFT OU RIGTH JOIN, MANTEM OS DADOS ORIGINAIS
