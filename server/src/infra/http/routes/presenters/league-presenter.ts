import type { LeagueWithTeams } from '#domain/warrior-foot/application/use-cases/league/get-league-by-id.ts'
import type { League } from '#domain/warrior-foot/enterprise/entities/league.ts'

export class LeaguePresenter {
  static toHTTP(league: League) {
    return {
      id: league.id.toString(),
      name: league.name,
      code: league.code,
      userId: league.userId.toString(),
    }
  }

  static withTeams(league: LeagueWithTeams) {
    return {
      id: league.id.toString(),
      name: league.name,
      code: league.code,
      userId: league.userId.toString(),
      teams: league.teams.map((team) => {
        return {
          id: team.id.toString(),
          name: team.name,
          division: team.division,
          primaryColor: team.primaryColor,
          secondaryColor: team.secondaryColor,
        }
      }),
    }
  }
}
