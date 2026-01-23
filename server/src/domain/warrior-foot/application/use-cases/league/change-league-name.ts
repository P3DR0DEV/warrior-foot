import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { UnauthorizedResourceAccess, type UnauthorizedResourceAccessError } from '#core/errors/unauthorized-resource-access.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { League } from '#domain/warrior-foot/enterprise/entities/league.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'

interface ChangeLeagueNameRequest {
  leagueId: string
  name: string
  userId: string
}

type ChangeLeagueNameResponse = Either<ResourceNotFoundError | UnauthorizedResourceAccessError, { league: League }>

export class ChangeLeagueNameUseCase {
  private readonly leaguesRepository: LeaguesRepository

  constructor(leaguesRepository: LeaguesRepository) {
    this.leaguesRepository = leaguesRepository
  }

  async execute({ leagueId, name, userId }: ChangeLeagueNameRequest): Promise<ChangeLeagueNameResponse> {
    const league = await this.leaguesRepository.findById(leagueId)

    if (!league) {
      return failure(ResourceNotFound('The league referenced by the user was not found'))
    }

    if (league.userId.toValue() !== userId) {
      return failure(UnauthorizedResourceAccess('Only the owner of the league can change its name'))
    }

    league.name = name

    await this.leaguesRepository.update(league)

    return success({ league })
  }
}

