import { eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { TeamsRepository } from '#domain/warrior-foot/application/repositories/teams-repository.ts'
import type { Team } from '#domain/warrior-foot/enterprise/entities/team.ts'
import { teams } from '#infra/database/schemas/teams.ts'
import { DrizzleTeamsMapper } from '../mappers/drizzle-teams-mapper.ts'

export class DrizzleTeamsRepository implements TeamsRepository {
  private drizzle: NodePgDatabase

  constructor(drizzle: NodePgDatabase) {
    this.drizzle = drizzle
  }

  async createMany(dataTeams: Team[]): Promise<void> {
    const data = dataTeams.map(DrizzleTeamsMapper.toPersistence)

    await this.drizzle.insert(teams).values(data)
  }

  async findById(id: string): Promise<Team | null> {
    const response = await this.drizzle.select().from(teams).where(eq(teams.id, id))

    if (response.length === 0) {
      return null
    }

    const team = response[0]

    return DrizzleTeamsMapper.toDomain(team)
  }

  async findByLeagueId(leagueId: string): Promise<Team[]> {
    const response = await this.drizzle.select().from(teams).where(eq(teams.leagueId, leagueId))

    return response.map(DrizzleTeamsMapper.toDomain)
  }

  async create(team: Team): Promise<void> {
    const data = DrizzleTeamsMapper.toPersistence(team)

    await this.drizzle.insert(teams).values(data)
  }
}
