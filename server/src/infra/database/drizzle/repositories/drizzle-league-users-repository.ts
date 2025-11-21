import { eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { LeagueUsersRepository } from '#domain/warrior-foot/application/repositories/league-users-repository.ts'
import type { LeagueUsers } from '#domain/warrior-foot/enterprise/entities/league-users.ts'
import { leagueUsers } from '#infra/database/schemas/league-users.ts'
import { DrizzleLeagueUsersMapper } from '../mappers/drizzle-league-users-mapper.ts'

export class DrizzleLeagueUsersRepository implements LeagueUsersRepository {
  private drizzle: NodePgDatabase

  constructor(drizzle: NodePgDatabase) {
    this.drizzle = drizzle
  }

  async findByUserId(userId: string): Promise<LeagueUsers[]> {
    const response = await this.drizzle.select().from(leagueUsers).where(eq(leagueUsers.userId, userId))

    return response.map(DrizzleLeagueUsersMapper.toDomain)
  }

  async create(leagueUser: LeagueUsers): Promise<void> {
    const data = DrizzleLeagueUsersMapper.toPersistence(leagueUser)

    await this.drizzle.insert(leagueUsers).values(data)
  }
}
