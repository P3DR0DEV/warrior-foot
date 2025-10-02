import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import { LeagueUsers } from '#domain/warrior-foot/enterprise/entities/league-users.ts'
import type { LeagueUsersRepository } from '../../repositories/league-users-repository.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'
import type { UsersRepository } from '../../repositories/users-repository.ts'

type LeagueUsersRole = 'owner' | 'guest'

interface CreateLeagueUsersRequest {
  leagueId: string
  userId: string
  role: LeagueUsersRole
}

type CreateLeagueUsersResponse = Either<ResourceNotFoundError, { leagueUser: LeagueUsers }>

export class CreateLeagueUsersUseCase {
  private readonly repository: LeagueUsersRepository
  private readonly usersRepository: UsersRepository
  private readonly leaguesRepository: LeaguesRepository

  constructor(
    leagueUsersRepository: LeagueUsersRepository,
    leaguesRepository: LeaguesRepository,
    usersRepository: UsersRepository,
  ) {
    this.repository = leagueUsersRepository
    this.leaguesRepository = leaguesRepository
    this.usersRepository = usersRepository
  }

  async execute({ leagueId, userId, role }: CreateLeagueUsersRequest): Promise<CreateLeagueUsersResponse> {
    const isUserValid = await this.usersRepository.findById(userId)

    if (!isUserValid) {
      return failure(ResourceNotFound('The user referenced by the league was not found'))
    }

    const isLeagueValid = await this.leaguesRepository.findById(leagueId)

    if (!isLeagueValid) {
      return failure(ResourceNotFound('The league referenced was not found'))
    }

    const leagueUser = LeagueUsers.create({ leagueId: new UniqueEntityId(leagueId), userId: new UniqueEntityId(userId), role })

    await this.repository.create(leagueUser)

    return success({ leagueUser })
  }
}
