import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import { League } from '#domain/warrior-foot/enterprise/entities/league.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'
import type { UsersRepository } from '../../repositories/users-repository.ts'

interface CreateLeagueRequest {
  name: string
  userId: string
}

type CreateLeagueResponse = Either<ResourceNotFoundError, { league: League }>

export class CreateLeagueUseCase {
  private readonly leaguesRepository: LeaguesRepository
  private readonly usersRepository: UsersRepository

  constructor(leaguesRepository: LeaguesRepository, usersRepository: UsersRepository) {
    this.leaguesRepository = leaguesRepository
    this.usersRepository = usersRepository
  }

  async execute({ name, userId }: CreateLeagueRequest): Promise<CreateLeagueResponse> {
    const isUserValid = await this.usersRepository.findById(userId)

    if (!isUserValid) {
      return failure(ResourceNotFound('The user referenced by the league was not found'))
    }

    const league = League.create({
      name,
      userId: new UniqueEntityId(userId),
    })

    await this.leaguesRepository.create(league)

    return success({ league })
  }
}
