import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { League } from '#domain/warrior-foot/enterprise/entities/league.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'
import type { UsersRepository } from '../../repositories/users-repository.ts'

interface GetLeaguesByUserRequest {
  userId: string
}

type GetLeaguesByUserResponse = Either<ResourceNotFoundError, { leagues: League[] }>

export class GetLeaguesByUserUseCase {
  private readonly leaguesRepository: LeaguesRepository
  private readonly usersRepository: UsersRepository

  constructor(leaguesRepository: LeaguesRepository, usersRepository: UsersRepository) {
    this.leaguesRepository = leaguesRepository
    this.usersRepository = usersRepository
  }

  async execute({ userId }: GetLeaguesByUserRequest): Promise<GetLeaguesByUserResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(ResourceNotFound('The user referenced by the league was not found'))
    }

    const leagues = await this.leaguesRepository.findByUserId(userId)

    return success({ leagues })
  }
}
