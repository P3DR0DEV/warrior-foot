import type { League } from '#domain/warrior-foot/enterprise/entities/league.ts'

export interface LeaguesRepository {
  findById(id: string): Promise<League | null>
  findByUserId(userId: string): Promise<League[]>

  create(league: League): Promise<void>
}
