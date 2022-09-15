import models from '../database/models';

const queryStructure = () => `SELECT t.team_name AS name,
COUNT(m.home_team) AS totalGames,
SUM(m.home_team_goals > m.away_team_goals) AS totalVictories,
SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
SUM(m.home_team_goals < m.away_team_goals) AS totalLosses,
SUM(m.home_team_goals) AS goalsFavor,
SUM(m.away_team_goals) AS goalsOwn,
SUM(m.home_team_goals - m.away_team_goals) AS goalsBalance
FROM TRYBE_FUTEBOL_CLUBE.matches AS m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t
ON m.home_team = t.id
WHERE m.in_progress = 0
GROUP BY t.team_name`;

const query = (q: string) => `SELECT
name,
(totalVictories * 3) + totalDraws as totalPoints,
totalGames,
totalVictories,
totalDraws,
totalLosses,
goalsFavor,
goalsOwn,
goalsBalance,
ROUND(((totalVictories * 3) + totalDraws)/(totalGames*3)*100,2) as efficiency
FROM (${q}) as query
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`;

class LeaderboardService {
  static async getAll() {
    const [leaderboard] = await models.query(query(queryStructure()));
    return leaderboard;
  }
}

export default LeaderboardService;
