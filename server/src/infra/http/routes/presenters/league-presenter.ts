import type { League } from "#domain/warrior-foot/enterprise/entities/league.ts";

export class LeaguePresenter {
  static toHTTP(league: League) {
    return {
      id: league.id.toString(),
      name: league.name,
      code: league.code,
      userId: league.userId.toString(),
    }
  }
}