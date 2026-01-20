import type { Match } from "#domain/warrior-foot/enterprise/entities/match.ts"

export interface MatchesRepository {
  findByScheduleId(scheduleId: string): Promise<Match[]>

  findById(id: string): Promise<Match | null>
  create(match: Match): Promise<void>
}