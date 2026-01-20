import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import { Match } from '#domain/warrior-foot/enterprise/entities/match.ts'
import type { MatchesRepository } from '../../repositories/matches-repository.ts'
import type { SchedulesRepository } from '../../repositories/schedules-repository.ts'

interface CreateMatchUseCaseRequest {
  scheduleId: string
  round: number
  homeTeamId: string
  awayTeamId: string
}

type CreateMatchUseCaseResponse = Either<ResourceNotFoundError, { match: Match }>

export class CreateMatchUseCase {
  private readonly repository: MatchesRepository
  private readonly schedulesRepository: SchedulesRepository

  constructor(repository: MatchesRepository, schedulesRepository: SchedulesRepository) {
    this.schedulesRepository = schedulesRepository
    this.repository = repository
  }

  async execute(props: CreateMatchUseCaseRequest): Promise<CreateMatchUseCaseResponse> {
    const { scheduleId, round, homeTeamId, awayTeamId } = props

    const schedule = await this.schedulesRepository.findById(scheduleId)

    if (!schedule) {
      return failure(ResourceNotFound('The schedule referenced in this match was not found'))
    }

    const match = Match.create({
      round,
      homeTeamId: new UniqueEntityId(homeTeamId),
      awayTeamId: new UniqueEntityId(awayTeamId),
      scheduleId: new UniqueEntityId(scheduleId),
    })

    await this.repository.create(match)

    return success({ match })
  }
}
