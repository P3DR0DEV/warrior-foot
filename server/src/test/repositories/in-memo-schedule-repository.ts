import type { SchedulesRepository } from "#domain/warrior-foot/application/repositories/schedules-repository.ts";
import type { Schedule } from "#domain/warrior-foot/enterprise/entities/schedule.ts";

export class InMemoryScheduleRepository implements SchedulesRepository {
  private items: Schedule[] = []

  async findByLeagueId(leagueId: string): Promise<Schedule[]> {
    const schedules = this.items.filter(item => item.leagueId.toValue() === leagueId)

    return schedules
  }

  async findById(id: string): Promise<Schedule | null> {
    const schedule = this.items.find(item => item.id.toValue() === id)

    if (!schedule) {
      return null
    }

    return schedule
  }

  async create(schedule: Schedule): Promise<void> {
    this.items.push(schedule)
  }

}