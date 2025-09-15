import type { LeagueUsers } from "#domain/warrior-foot/enterprise/entities/league-users.ts"

export interface LeagueUsersRepository {
  create(leagueUser: LeagueUsers): Promise<void>
}