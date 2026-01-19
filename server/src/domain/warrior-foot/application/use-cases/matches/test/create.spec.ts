import { UniqueEntityId } from "#core/entities/unique-entity-id.ts"
import { makeSchedule } from "#test/factories/make-schedule.ts"
import { InMemoryMatchesRepository } from "#test/repositories/in-memo-matches-repository.ts"
import { InMemoryScheduleRepository } from "#test/repositories/in-memo-schedule-repository.ts"
import { CreateMatchUseCase } from "../create.ts"

let matchesRepository: InMemoryMatchesRepository
let schedulesRepository: InMemoryScheduleRepository
let sut: CreateMatchUseCase

describe('Create Match Use Case', () => {
  beforeEach(() => {
    matchesRepository = new InMemoryMatchesRepository()
    schedulesRepository = new InMemoryScheduleRepository()
    sut = new CreateMatchUseCase(matchesRepository, schedulesRepository)
  })

  it('should return success', async () => {
    const schedule = makeSchedule()
    await schedulesRepository.create(schedule)

    const result = await sut.execute({
      scheduleId: schedule.id.toValue(),
      round: 1,
      homeTeamId: new UniqueEntityId().toValue(),
      awayTeamId: new UniqueEntityId().toValue()
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { match } = result.value

      expect(match.id.toValue()).toBeTruthy()
      expect(match.round).toBe(1)
      expect(match.home.toValue()).toBeDefined()
      expect(match.away.toValue()).toBeDefined()
      expect(match.scheduleId.toValue()).toBe(schedule.id.toValue())
    }
  })
})