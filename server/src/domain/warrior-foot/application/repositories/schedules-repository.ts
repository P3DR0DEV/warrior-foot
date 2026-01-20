import type { Schedule } from "#domain/warrior-foot/enterprise/entities/schedule.ts";

export interface SchedulesRepository {
  findByLeagueId(leagueId: string): Promise<Schedule[]>

  findById(id: string): Promise<Schedule | null>
  create(schedule: Schedule): Promise<void>
}