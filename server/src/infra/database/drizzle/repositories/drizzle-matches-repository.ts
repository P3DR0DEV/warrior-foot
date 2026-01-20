import { eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { MatchesRepository } from '#domain/warrior-foot/application/repositories/matches-repository.ts'
import type { Match } from '#domain/warrior-foot/enterprise/entities/match.ts'
import { matches } from '#infra/database/schemas/matches.ts'
import { DrizzleMatchesMapper } from '../mappers/drizzle-matches-mapper.ts'

export class DrizzleMatchesRepository implements MatchesRepository {
  private drizzle: NodePgDatabase

  constructor(drizzle: NodePgDatabase) {
    this.drizzle = drizzle
  }

  async findByScheduleId(scheduleId: string): Promise<Match[]> {
    const response = await this.drizzle.select().from(matches).where(eq(matches.scheduleId, scheduleId))

    return response.map(DrizzleMatchesMapper.toDomain)
  }

  async findById(id: string): Promise<Match | null> {
    const response = await this.drizzle.select().from(matches).where(eq(matches.id, id))

    if (response.length === 0) {
      return null
    }

    const match = response[0]

    return DrizzleMatchesMapper.toDomain(match)
  }

  async create(match: Match): Promise<void> {
    const data = DrizzleMatchesMapper.toPersistence(match)

    await this.drizzle.insert(matches).values(data)
    
  }
}
