import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { Match } from '#domain/warrior-foot/enterprise/entities/match.ts'
import type { MatchesRepository } from '../../repositories/matches-repository.ts'
import type { SchedulesRepository } from '../../repositories/schedules-repository.ts'

interface GetMatchesByScheduleUseCaseRequest {
  scheduleId: string
}

type GetMatchesByScheduleUseCaseResponse = Either<ResourceNotFoundError, { matches: Match[] }>

export class GetMatchesByScheduleUseCase {
  private readonly repository: MatchesRepository
  private readonly schedulesRepository: SchedulesRepository

  constructor(repository: MatchesRepository, schedulesRepository: SchedulesRepository) {
    this.schedulesRepository = schedulesRepository
    this.repository = repository
  }

  async execute(props: GetMatchesByScheduleUseCaseRequest): Promise<GetMatchesByScheduleUseCaseResponse> {
    const { scheduleId } = props

    const schedule = await this.schedulesRepository.findById(scheduleId)

    if (!schedule) {
      return failure(ResourceNotFound('The schedule referenced in this match was not found'))
    }

    const matches = await this.repository.findByScheduleId(scheduleId)

    return success({ matches })
  }
}
