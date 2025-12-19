import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { League } from '#domain/warrior-foot/enterprise/entities/league.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'

interface ChangeLeagueNameRequest {
  leagueId: string
  name: string
}

type ChangeLeagueNameResponse = Either<ResourceNotFoundError, { league: League }>

export class ChangeLeagueNameUseCase {
  private readonly leaguesRepository: LeaguesRepository

  constructor(leaguesRepository: LeaguesRepository) {
    this.leaguesRepository = leaguesRepository
  }

  async execute({ leagueId, name }: ChangeLeagueNameRequest): Promise<ChangeLeagueNameResponse> {
    const league = await this.leaguesRepository.findById(leagueId)

    if (!league) {
      return failure(ResourceNotFound('The league referenced by the user was not found'))
    }

    league.name = name

    await this.leaguesRepository.update(league)

    return success({ league })
  }
}

