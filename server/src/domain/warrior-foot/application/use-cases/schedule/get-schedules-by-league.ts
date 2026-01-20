import { type Either, success } from '#core/types/either.ts'
import type { Schedule } from '#domain/warrior-foot/enterprise/entities/schedule.ts'
import type { SchedulesRepository } from '../../repositories/schedules-repository.ts'

interface GetSchedulesByLeagueUseCaseRequest {
  leagueId: string
}

type GetSchedulesByLeagueUseCaseResponse = Either<Error, { schedules: Schedule[] }>

export class GetSchedulesByLeagueUseCase {
  private readonly repository: SchedulesRepository

  constructor(repository: SchedulesRepository) {
    this.repository = repository
  }

  async execute(props: GetSchedulesByLeagueUseCaseRequest): Promise<GetSchedulesByLeagueUseCaseResponse> {
    const { leagueId } = props

    const schedules = await this.repository.findByLeagueId(leagueId)

    return success({ schedules })
  }
}
