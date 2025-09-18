import { makeLeague } from '#test/factories/make-league.ts'
import { makeUser } from '#test/factories/make-user.ts'
import { InMemoryLeaguesRepository } from '#test/repositories/in-memo-leagues-repository.ts'
import { InMemoryUsersRepository } from '#test/repositories/in-memo-users-repository.ts'
import { GetLeagueByIdUseCase } from '../get-league-by-id.ts'

let usersRepository:InMemoryUsersRepository
let leaguesRepository: InMemoryLeaguesRepository
let sut: GetLeagueByIdUseCase
describe('Get League By Id Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    leaguesRepository = new InMemoryLeaguesRepository()
    sut = new GetLeagueByIdUseCase(leaguesRepository)
  })
  it('should return a league by id', async () => {
    const user = await makeUser()
    await usersRepository.create(user)

    const league = makeLeague({
      userId: user.id,
    })
    await leaguesRepository.create(league)

    const response = await sut.execute({
      leagueId: league.id.toString(),
    })

    expect(response.isSuccess()).toBe(true)

    if (response.isSuccess()) {
      const { league: foundLeague } = response.value
      expect(foundLeague.id).toBe(league.id)
      expect(foundLeague.name).toBe(league.name)
      expect(foundLeague.code).toBe(league.code)
      expect(foundLeague.userId.toValue()).toBe(user.id.toValue())
    }
  })
})
