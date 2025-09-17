import { makeLeague } from "#test/factories/make-league.ts"
import { makeUser } from "#test/factories/make-user.ts"
import { InMemoryLeaguesRepository } from "#test/repositories/in-memo-leagues-repository.ts"
import { InMemoryUsersRepository } from "#test/repositories/in-memo-users-repository.ts"
import { GetLeaguesByUserUseCase } from "../get-leagues-by-user.ts"

let usersRepository: InMemoryUsersRepository
let leaguesRepository: InMemoryLeaguesRepository
let sut: GetLeaguesByUserUseCase

describe('Get Leagues By User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    leaguesRepository = new InMemoryLeaguesRepository()
    sut = new GetLeaguesByUserUseCase(leaguesRepository, usersRepository)
  })

  it('should return a list of leagues', async () => {
    const user = makeUser()
    await usersRepository.create(user)

    for (let i = 0; i < 3; i++) {
      const league = makeLeague({ userId: user.id })
      await leaguesRepository.create(league)
    }

    const response = await sut.execute({
      userId: user.id.toString(),
    })

    expect(response.isSuccess()).toBeTruthy()

    if (response.isSuccess()) {
      const { leagues } = response.value

      expect(leagues.length).toBe(3)
    }
  })
})