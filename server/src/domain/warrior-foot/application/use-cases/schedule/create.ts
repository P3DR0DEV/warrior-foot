import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import { type Division, Schedule } from '#domain/warrior-foot/enterprise/entities/schedule.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'
import type { SchedulesRepository } from '../../repositories/schedules-repository.ts'

interface CreateScheduleUseCaseRequest {
  leagueId: string
  division: Division
}

type CreateScheduleUseCaseResponse = Either<ResourceNotFoundError, { schedule: Schedule }>

export class CreateScheduleUseCase {
  private readonly repository: SchedulesRepository
  private readonly leaguesRepository: LeaguesRepository

  constructor(repository: SchedulesRepository, leaguesRepository: LeaguesRepository) {
    this.leaguesRepository = leaguesRepository
    this.repository = repository
  }

  async execute(props: CreateScheduleUseCaseRequest): Promise<CreateScheduleUseCaseResponse> {
    const { leagueId, division } = props

    const league = await this.leaguesRepository.findById(leagueId)

    if (!league) {
      return failure(ResourceNotFound('The league referenced by the schedule was not found'))
    }

    const schedule = Schedule.create({
      leagueId: new UniqueEntityId(leagueId),
      division,
    })

    await this.repository.create(schedule)

    return success({ schedule })
  }
}
