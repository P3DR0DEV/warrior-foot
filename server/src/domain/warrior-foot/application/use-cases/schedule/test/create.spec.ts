import { makeLeague } from "#test/factories/make-league.ts"
import { InMemoryLeaguesRepository } from "#test/repositories/in-memo-leagues-repository.ts"
import { InMemoryScheduleRepository } from "#test/repositories/in-memo-schedule-repository.ts"
import { CreateScheduleUseCase } from "../create.ts"

let schedulesRepository: InMemoryScheduleRepository
let leaguesRepository: InMemoryLeaguesRepository
let sut: CreateScheduleUseCase

describe('Create Schedule Use Case', () => {
  beforeEach(() => {
    leaguesRepository = new InMemoryLeaguesRepository()
    schedulesRepository = new InMemoryScheduleRepository()
    sut = new CreateScheduleUseCase(schedulesRepository, leaguesRepository)
  })

  it('should create a new schedule', async () => {
    const league = makeLeague()
    leaguesRepository.create(league)

    const result = await sut.execute({ leagueId: league.id.toValue(), division: 'A' })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { schedule } = result.value

      expect(schedule.leagueId.toValue()).toBe(league.id.toValue())
      expect(schedule.id.toValue()).toBeTruthy()
    }
  })
})