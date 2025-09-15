import type { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import { League } from '#domain/warrior-foot/enterprise/entities/league.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository'
import type { UsersRepository } from '../../repositories/users-repository'

interface CreateLeagueRequest {
  name: string
  userId: UniqueEntityId
}

type CreateLeagueResponse = Either<ResourceNotFoundError, { league: League }>

export class CreateLeagueUseCase {
  constructor(
    private readonly leaguesRepository: LeaguesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ name, userId }: CreateLeagueRequest): Promise<CreateLeagueResponse> {
    const isUserValid = await this.usersRepository.findById(userId.toValue())

    if (!isUserValid) {
      return failure(ResourceNotFound('The user referenced by the league was not found'))
    }

    const league = League.create({ name, userId })

    await this.leaguesRepository.create(league)

    return success({ league })
  }
}
