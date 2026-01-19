import { makeMatch } from "#test/factories/make-match.ts"
import { makeSchedule } from "#test/factories/make-schedule.ts"
import { InMemoryMatchesRepository } from "#test/repositories/in-memo-matches-repository.ts"
import { InMemoryScheduleRepository } from "#test/repositories/in-memo-schedule-repository.ts"
import { GetMatchByIdUseCase } from "../get-match-by-id.ts"

let matchesRepository: InMemoryMatchesRepository
let schedulesRepository: InMemoryScheduleRepository
let sut: GetMatchByIdUseCase

describe('Get Match by id use case', () => {
  beforeEach(() => {
    matchesRepository = new InMemoryMatchesRepository()
    schedulesRepository = new InMemoryScheduleRepository()
    sut = new GetMatchByIdUseCase(matchesRepository)
  })

  it('should return success', async () => {
    const schedule = makeSchedule()
    await schedulesRepository.create(schedule)

    const match = makeMatch({ scheduleId: schedule.id })
    await matchesRepository.create(match)

    const result = await sut.execute({ id: match.id.toValue() })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { match: resultMatch } = result.value

      expect(resultMatch.id.toValue()).toBe(match.id.toValue())
      expect(resultMatch.round).toBe(match.round)
      expect(resultMatch.home.toValue()).toBe(match.home.toValue())
      expect(resultMatch.away.toValue()).toBe(match.away.toValue())
      expect(resultMatch.scheduleId.toValue()).toBe(match.scheduleId.toValue())
    }
  })
})