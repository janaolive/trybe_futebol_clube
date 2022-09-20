const queryHomeRanking = `SELECT name,
    (totalVictories * 3) + totalDraws AS totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    ROUND(((totalVictories * 3) + totalDraws)/(totalGames*3)*100,2) AS efficiency
FROM (
    SELECT t.team_name AS name,
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
    GROUP BY t.team_name
) AS home_ranking
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`;

const queryAwayRanking = `SELECT name,
    (totalVictories * 3) + totalDraws AS totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    ROUND(((totalVictories * 3) + totalDraws)/(totalGames*3)*100,2) AS efficiency
FROM (
    SELECT t.team_name AS name,
        COUNT(m.away_team) AS totalGames,
        SUM(m.away_team_goals > m.home_team_goals) AS totalVictories,
        SUM(m.away_team_goals = m.home_team_goals) AS totalDraws,
        SUM(m.away_team_goals < m.home_team_goals) AS totalLosses,
        SUM(m.away_team_goals) AS goalsFavor,
        SUM(m.home_team_goals) AS goalsOwn,
        SUM(m.away_team_goals - m.home_team_goals) AS goalsBalance
        FROM TRYBE_FUTEBOL_CLUBE.matches AS m
        INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t
        ON m.away_team = t.id
        WHERE m.in_progress = 0
        GROUP BY t.team_name
) as away_ranking
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

const queryGeneralRanking = `SELECT
    t.id,
    t.team_name as name,
    ((c.totalVictories + v.totalVictories) * 3) + (c.totalDraws + v.totalDraws) as totalPoints,
    c.totalGames + v.totalGames AS totalGames,
    c.totalVictories + v.totalVictories AS totalVictories,
    c.totalDraws + v.totalDraws AS totalDraws,
    c.totalLosses + v.totalLosses AS totalLosses,
    c.goalsFavor + v.goalsFavor AS goalsFavor,
    c.goalsOwn + v.goalsOwn AS goalsOwn,
    c.goalsBalance + v.goalsBalance AS goalsBalance,
    ROUND(((c.totalVictories + v.totalVictories)*3)
    + (c.totalDraws + v.totalDraws)/((c.totalGames + v.totalGames)*3)*100,2) as efficiency,
    c.totalGoals + v.totalGoals AS totalGoals
    FROM TRYBE_FUTEBOL_CLUBE.teams AS t
LEFT JOIN
    (SELECT
        t.id,
        COUNT(m.home_team) AS totalGames,
        SUM(m.home_team_goals) AS totalGoals,
        SUM(m.home_team_goals > m.away_team_goals) AS totalVictories,
        SUM(m.away_team_goals = m.home_team_goals) AS totalDraws,
        SUM(m.home_team_goals < m.away_team_goals) AS totalLosses,
        SUM(m.away_team_goals) AS goalsFavor,
        SUM(m.home_team_goals) AS goalsOwn,
        SUM(m.home_team_goals - m.away_team_goals) AS goalsBalance
    FROM TRYBE_FUTEBOL_CLUBE.teams AS t
    LEFT JOIN TRYBE_FUTEBOL_CLUBE.matches AS m ON t.id = m.home_team
    WHERE m.in_progress = 0
    GROUP BY t.id) AS c ON t.id = c.id
LEFT JOIN
    (SELECT
        t.id,
        COUNT(ma.away_team) AS totalGames,
        SUM(ma.away_team_goals) AS totalGoals,
        SUM(ma.away_team_goals > ma.home_team_goals) AS totalVictories,
        SUM(ma.away_team_goals = ma.home_team_goals) AS totalDraws,
        SUM(ma.away_team_goals < ma.home_team_goals) AS totalLosses,
        SUM(ma.away_team_goals) AS goalsFavor,
        SUM(ma.home_team_goals) AS goalsOwn,
        SUM(ma.away_team_goals - ma.home_team_goals) AS goalsBalance
    FROM TRYBE_FUTEBOL_CLUBE.teams AS t
    LEFT JOIN TRYBE_FUTEBOL_CLUBE.matches AS ma ON t.id = ma.away_team
    WHERE ma.in_progress = 0
    GROUP BY t.id) AS v ON t.id = v.id
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`;

export { queryHomeRanking, queryAwayRanking, queryGeneralRanking };
