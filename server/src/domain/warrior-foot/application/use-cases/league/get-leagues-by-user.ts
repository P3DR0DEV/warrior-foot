import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { League } from '#domain/warrior-foot/enterprise/entities/league.ts'
import type { LeagueUsersRepository } from '../../repositories/league-users-repository.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'
import type { UsersRepository } from '../../repositories/users-repository.ts'

interface GetLeaguesByUserRequest {
  userId: string
}

type GetLeaguesByUserResponse = Either<ResourceNotFoundError, { myLeagues: League[]; otherLeagues: League[] }>

export class GetLeaguesByUserUseCase {
  private readonly leaguesRepository: LeaguesRepository
  private readonly usersRepository: UsersRepository
  private readonly leagueUsersRepository: LeagueUsersRepository

  constructor(
    leaguesRepository: LeaguesRepository,
    usersRepository: UsersRepository,
    leagueUsersRepository: LeagueUsersRepository,
  ) {
    this.leaguesRepository = leaguesRepository
    this.usersRepository = usersRepository
    this.leagueUsersRepository = leagueUsersRepository
  }

  async execute({ userId }: GetLeaguesByUserRequest): Promise<GetLeaguesByUserResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(ResourceNotFound('The user referenced by the league was not found'))
    }

    const [leagues, leagueUsers] = await Promise.all([
      this.leaguesRepository.findByUserId(userId),
      this.leagueUsersRepository.findByUserId(userId),
    ])

    const otherLeagues: League[] = []

    for (const leagueUser of leagueUsers) {
      const league = await this.leaguesRepository.findById(leagueUser.leagueId.toValue())
      if (league) {
        otherLeagues.push(league)
      }
    }

    return success({ myLeagues: leagues, otherLeagues })
  }
}
