import { makeLeague } from "#test/factories/make-league.ts"
import { makeSchedule } from "#test/factories/make-schedule.ts"
import { InMemoryLeaguesRepository } from "#test/repositories/in-memo-leagues-repository.ts"
import { InMemoryScheduleRepository } from "#test/repositories/in-memo-schedule-repository.ts"
import { GetSchedulesByLeagueUseCase } from "../get-schedules-by-league.ts"

let schedulesRepository: InMemoryScheduleRepository
let leaguesRepository: InMemoryLeaguesRepository
let sut: GetSchedulesByLeagueUseCase

describe('Get Schedules By League Use Case', () => {
  beforeEach(() => {
    schedulesRepository = new InMemoryScheduleRepository()
    leaguesRepository = new InMemoryLeaguesRepository()
    sut = new GetSchedulesByLeagueUseCase(schedulesRepository)
  })

  it('should return success', async () => {
    const league = makeLeague()
    await leaguesRepository.create(league)

    const schedule = makeSchedule({ leagueId: league.id })
    await schedulesRepository.create(schedule)

    const result = await sut.execute({ leagueId: league.id.toValue() })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { schedules } = result.value

      expect(schedules.length).toBe(1)
      expect(schedules[0].id.toValue()).toBe(schedule.id.toValue())
      expect(schedules[0].leagueId.toValue()).toBe(schedule.leagueId.toValue())
      expect(schedules[0].division).toBe(schedule.division)
    }
  })
})