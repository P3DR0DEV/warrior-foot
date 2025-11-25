import type { LeagueUsersRepository } from '#domain/warrior-foot/application/repositories/league-users-repository.ts'
import type { LeagueUsers } from '#domain/warrior-foot/enterprise/entities/league-users.ts'

export class InMemoryLeagueUsersRepository implements LeagueUsersRepository {
  public leagueUsers: LeagueUsers[] = []

  async create(leagueUser: LeagueUsers): Promise<void> {
    await this.leagueUsers.push(leagueUser)
  }

  async findByUserId(userId: string): Promise<LeagueUsers[]> {
    const leagueUsers = this.leagueUsers.filter((leagueUser) => leagueUser.userId.toValue() === userId)

    return leagueUsers
  }
}
