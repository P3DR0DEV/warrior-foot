import { eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { SchedulesRepository } from '#domain/warrior-foot/application/repositories/schedules-repository.ts'
import type { Schedule } from '#domain/warrior-foot/enterprise/entities/schedule.ts'
import { schedules } from '#infra/database/schemas/schedules.ts'
import { DrizzleSchedulesMapper } from '../mappers/drizzle-schedules-mapper.ts'

export class DrizzleSchedulesRepository implements SchedulesRepository {
  private drizzle: NodePgDatabase

  constructor(drizzle: NodePgDatabase) {
    this.drizzle = drizzle
  }

  async findByLeagueId(leagueId: string): Promise<Schedule[]> {
    const response = await this.drizzle.select().from(schedules).where(eq(schedules.leagueId, leagueId))

    return response.map(DrizzleSchedulesMapper.toDomain)
  }

  async findById(id: string): Promise<Schedule | null> {
    const response = await this.drizzle.select().from(schedules).where(eq(schedules.id, id))

    if (response.length === 0) {
      return null
    }

    const schedule = response[0]

    return DrizzleSchedulesMapper.toDomain(schedule)
  }

  async create(schedule: Schedule): Promise<void> {
    const data = DrizzleSchedulesMapper.toPersistence(schedule)

    await this.drizzle.insert(schedules).values(data)
  }
}
