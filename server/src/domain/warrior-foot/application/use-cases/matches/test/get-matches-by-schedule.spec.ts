import { makeMatch } from "#test/factories/make-match.ts"
import { makeSchedule } from "#test/factories/make-schedule.ts"
import  { InMemoryMatchesRepository } from "#test/repositories/in-memo-matches-repository.ts"
import { InMemoryScheduleRepository } from "#test/repositories/in-memo-schedule-repository.ts"
import  { GetMatchesByScheduleUseCase } from "../get-matches-by-schedule.ts"

let matchesRepository: InMemoryMatchesRepository
let schedulesRepository: InMemoryScheduleRepository
let sut: GetMatchesByScheduleUseCase

describe('Get Matches By Schedule Use Case', () => {
  beforeEach(() => {
    matchesRepository = new InMemoryMatchesRepository()
    schedulesRepository = new InMemoryScheduleRepository()
    sut = new GetMatchesByScheduleUseCase(matchesRepository, schedulesRepository)
  })

  it('should return success', async () => {
    const schedule = makeSchedule()
    await schedulesRepository.create(schedule)

    for (let i = 0; i < 3; i++) {
      const match = makeMatch({ scheduleId: schedule.id })
      await matchesRepository.create(match)
    }

    const result = await sut.execute({ scheduleId: schedule.id.toValue() })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { matches } = result.value

      expect(matches.length).toBe(3)
      
      for (const match of matches) {
        expect(match.id.toValue()).toBeTruthy()
        expect(match.round).toBe(1)
        expect(match.home.toValue()).toBeDefined()
        expect(match.away.toValue()).toBeDefined()
        expect(match.scheduleId.toValue()).toBe(schedule.id.toValue())
      }
    }
  })
})