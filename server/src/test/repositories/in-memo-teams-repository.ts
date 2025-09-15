import type { TeamsRepository } from "#domain/warrior-foot/application/repositories/teams-repository.ts";
import type { Team } from "#domain/warrior-foot/enterprise/entities/team.ts";

export class InMemoryTeamsRepository implements TeamsRepository {
  public items: Team[] = []

  async findById(id: string): Promise<Team | null> {
    return this.items.find((item) => item.id.toValue() === id) ?? null
  }

  async findByLeagueId(leagueId: string): Promise<Team[]> {
    return this.items.filter((item) => item.leagueId.toValue() === leagueId)
  }

  async create(team: Team): Promise<void> {
    this.items.push(team)
  }
}