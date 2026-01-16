import { makeSchedule } from "#test/factories/make-schedule.ts"
import { InMemoryScheduleRepository } from "#test/repositories/in-memo-schedule-repository.ts"
import { GetScheduleByIdUseCase } from "../get-schedule-by-id.ts"

let schedulesRepository: InMemoryScheduleRepository
let sut: GetScheduleByIdUseCase

describe('Get Schedule By Id Use Case', () => {
  beforeEach(() => {
    schedulesRepository = new InMemoryScheduleRepository()
    sut = new GetScheduleByIdUseCase(schedulesRepository)
  })

  it('should return success', async () => {
    const schedule = makeSchedule()
    await schedulesRepository.create(schedule)

    const result = await sut.execute({ id: schedule.id.toValue() })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { schedule: resultSchedule } = result.value

      expect(resultSchedule.id.toValue()).toBe(schedule.id.toValue())
      expect(resultSchedule.leagueId.toValue()).toBe(schedule.leagueId.toValue())
      expect(resultSchedule.division).toBe(schedule.division)
    }
  })
})