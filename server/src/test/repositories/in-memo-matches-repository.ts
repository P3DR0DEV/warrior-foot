import type { MatchesRepository } from "#domain/warrior-foot/application/repositories/matches-repository.ts";
import type { Match } from "#domain/warrior-foot/enterprise/entities/match.ts";

export class InMemoryMatchesRepository implements MatchesRepository {
  private items: Match[] = []

  async findByScheduleId(scheduleId: string): Promise<Match[]> {
    const matches = this.items.filter(item => item.scheduleId.toValue() === scheduleId)

    return matches
  }

  async findById(id: string): Promise<Match | null> {
    const match = this.items.find(item => item.id.toValue() === id)

    if (!match) {
      return null
    }

    return match
  }

  async create(match: Match): Promise<void> {
    this.items.push(match)
  }
}