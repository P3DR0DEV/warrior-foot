import type { Team } from '#domain/warrior-foot/enterprise/entities/team.ts'

export interface TeamsRepository {
  findById(id: string): Promise<Team | null>
  findByLeagueId(leagueId: string): Promise<Team[]>
  createMany(teams: Team[]): Promise<void>

  create(team: Team): Promise<void>
}
