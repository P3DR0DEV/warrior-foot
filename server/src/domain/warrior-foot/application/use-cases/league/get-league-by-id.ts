import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { League } from '#domain/warrior-foot/enterprise/entities/league.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'

type GetLeagueByIdUseCaseResponse = Either<ResourceNotFoundError, { league: League }>

export class GetLeagueByIdUseCase {
  private readonly repository: LeaguesRepository

  constructor(repository: LeaguesRepository) {
    this.repository = repository
  }

  async execute({ leagueId }: { leagueId: string }): Promise<GetLeagueByIdUseCaseResponse> {
    const league = await this.repository.findById(leagueId)

    if (!league) {
      return failure(ResourceNotFound('The league referenced by the user was not found'))
    }


    // TODO - create teams in the first getLeagueById 
    
    return success({ league })
  }
}
