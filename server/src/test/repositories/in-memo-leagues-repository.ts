import type { LeaguesRepository } from '#domain/warrior-foot/application/repositories/leagues-repository.ts'
import type { League } from '#domain/warrior-foot/enterprise/entities/league.ts'

export class InMemoryLeaguesRepository implements LeaguesRepository {
  public items: League[] = []

  async findByUserId(userId: string): Promise<League[]> {
    const leagues = this.items.filter((league) => league.userId.toValue() === userId)

    return leagues
  }

  async update(league: League): Promise<void> {
    const item = this.items.find((item) => item.id.toValue() === league.id.toValue())

    if (item) {
      item.name = league.name
    }

    return
  }

  async findById(id: string): Promise<League | null> {
    const league = this.items.find((item) => item.id.toValue() === id)

    if (!league) {
      return null
    }

    return league
  }

  async create(league: League): Promise<void> {
    this.items.push(league)
  }

  async findByCode(code: string): Promise<League | null> {
    const league = this.items.find((item) => item.code === code)

    if (!league) {
      return null
    }

    return league
  }
}
