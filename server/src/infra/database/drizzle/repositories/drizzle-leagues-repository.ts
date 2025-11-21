import { eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { LeaguesRepository } from '#domain/warrior-foot/application/repositories/leagues-repository.ts'
import type { League } from '#domain/warrior-foot/enterprise/entities/league.ts'
import { leagues } from '#infra/database/schemas/leagues.ts'
import { DrizzleLeaguesMapper } from '../mappers/drizzle-leagues-mapper.ts'

export class DrizzleLeaguesRepository implements LeaguesRepository {
  private drizzle: NodePgDatabase

  constructor(drizzle: NodePgDatabase) {
    this.drizzle = drizzle
  }

  async findById(id: string): Promise<League | null> {
    const response = await this.drizzle.select().from(leagues).where(eq(leagues.id, id))

    if (response.length === 0) {
      return null
    }

    const league = response[0]

    return DrizzleLeaguesMapper.toDomain(league)
  }

  async findByUserId(userId: string): Promise<League[]> {
    const response = await this.drizzle.select().from(leagues).where(eq(leagues.userId, userId))

    return response.map(DrizzleLeaguesMapper.toDomain)
  }

  async create(league: League): Promise<void> {
    const data = DrizzleLeaguesMapper.toPersistence(league)

    await this.drizzle.insert(leagues).values(data)
  }

  async findByCode(code: string): Promise<League | null> {
    const response = await this.drizzle.select().from(leagues).where(eq(leagues.code, code))

    if (response.length === 0) {
      return null
    }

    const league = response[0]

    return DrizzleLeaguesMapper.toDomain(league)
  }
}
