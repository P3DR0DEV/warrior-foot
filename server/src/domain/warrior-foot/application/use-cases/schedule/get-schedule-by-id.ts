import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { Schedule } from '#domain/warrior-foot/enterprise/entities/schedule.ts'
import type { SchedulesRepository } from '../../repositories/schedules-repository.ts'

interface GetScheduleByIdUseCaseRequest {
  id: string
}

type GetScheduleByIdUseCaseResponse = Either<ResourceNotFoundError, { schedule: Schedule }>

export class GetScheduleByIdUseCase {
  private readonly repository: SchedulesRepository

  constructor(repository: SchedulesRepository) {
    this.repository = repository
  }

  async execute(props: GetScheduleByIdUseCaseRequest): Promise<GetScheduleByIdUseCaseResponse> {
    const { id } = props

    const schedule = await this.repository.findById(id)

    if (!schedule) {
      return failure(ResourceNotFound('The schedule referenced by the id was not found'))
    }

    return success({ schedule })
  }
}
