import type { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import { LeagueUsers } from '#domain/warrior-foot/enterprise/entities/league-users.ts'
import type { LeagueUsersRepository } from '../../repositories/league-users-repository'
import type { LeaguesRepository } from '../../repositories/leagues-repository'
import type { UsersRepository } from '../../repositories/users-repository'

type LeagueUsersRole = 'owner' | 'guest'

interface CreateLeagueUsersRequest {
  leagueId: UniqueEntityId
  userId: UniqueEntityId
  role: LeagueUsersRole
}

type CreateLeagueUsersResponse = Either<ResourceNotFoundError, { leagueUser: LeagueUsers }>

export class CreateLeagueUsersUseCase {
  constructor(
    private readonly leagueUsersRepository: LeagueUsersRepository,
    private readonly leaguesRepository: LeaguesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ leagueId, userId, role }: CreateLeagueUsersRequest): Promise<CreateLeagueUsersResponse> {
    const isUserValid = await this.usersRepository.findById(userId.toValue())

    if (!isUserValid) {
      return failure(ResourceNotFound('The user referenced by the league was not found'))
    }

    const isLeagueValid = await this.leaguesRepository.findById(leagueId.toValue())

    if (!isLeagueValid) {
      return failure(ResourceNotFound('The league referenced was not found'))
    }

    const leagueUser = LeagueUsers.create({ leagueId, userId, role })

    await this.leagueUsersRepository.create(leagueUser)

    return success({ leagueUser })
  }
}
