export interface Ilogin {
  email: string;
}

export interface IGoal {
  homeTeamGoals: string,
  awayTeamGoals: string
}

export interface INewMatch extends IGoal {
  homeTeam: string,
  awayTeam: string
}
