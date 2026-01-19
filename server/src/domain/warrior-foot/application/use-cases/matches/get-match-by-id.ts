import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { Match } from '#domain/warrior-foot/enterprise/entities/match.ts'
import type { MatchesRepository } from '../../repositories/matches-repository.ts'

interface GetMatchByIdUseCaseRequest {
  id: string
}

type GetMatchByIdUseCaseResponse = Either<ResourceNotFoundError, { match: Match }>

export class GetMatchByIdUseCase {
  private readonly repository: MatchesRepository
  constructor(repository: MatchesRepository) {
    this.repository = repository
  }

  async execute(props: GetMatchByIdUseCaseRequest): Promise<GetMatchByIdUseCaseResponse> {
    const { id } = props

    const match = await this.repository.findById(id)

    if (!match) {
      return failure(ResourceNotFound(`The match whit id: ${id} was not found`))
    }

    return success({ match })
  }
}
