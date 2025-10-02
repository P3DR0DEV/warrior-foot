import { makeLeague } from '#test/factories/make-league.ts'
import { makeLeagueUser } from '#test/factories/make-league-users.ts'
import { makeUser } from '#test/factories/make-user.ts'
import { InMemoryLeagueUsersRepository } from '#test/repositories/in-memo-league-users-repository.ts'
import { InMemoryLeaguesRepository } from '#test/repositories/in-memo-leagues-repository.ts'
import { InMemoryUsersRepository } from '#test/repositories/in-memo-users-repository.ts'
import { GetLeaguesByUserUseCase } from '../get-leagues-by-user.ts'

let usersRepository: InMemoryUsersRepository
let leagueUsersRepository: InMemoryLeagueUsersRepository
let leaguesRepository: InMemoryLeaguesRepository
let sut: GetLeaguesByUserUseCase

describe('Get Leagues By User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    leaguesRepository = new InMemoryLeaguesRepository()
    leagueUsersRepository = new InMemoryLeagueUsersRepository()

    sut = new GetLeaguesByUserUseCase(leaguesRepository, usersRepository, leagueUsersRepository)
  })

  it('should return a list of leagues', async () => {
    const user = await makeUser()
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
      const { myLeagues, otherLeagues } = response.value

      expect(myLeagues.length).toBe(3)
      expect(otherLeagues.length).toBe(0)
    }
  })

  it('should return a list of leagues with other leagues', async () => {
    const user = await makeUser()
    await usersRepository.create(user)

    const user2 = await makeUser()
    await usersRepository.create(user2)

    for (let i = 0; i < 3; i++) {
      const league = makeLeague({ userId: user.id })
      await leaguesRepository.create(league)
    }
    const league = makeLeague({ userId: user2.id })
    await leaguesRepository.create(league)

    const leagueUser = makeLeagueUser({ userId: user.id, leagueId: league.id, role: 'guest' })
    await leagueUsersRepository.create(leagueUser)

    const response = await sut.execute({
      userId: user.id.toString(),
    })

    expect(response.isSuccess()).toBeTruthy()

    if (response.isSuccess()) {
      const { myLeagues, otherLeagues } = response.value

      expect(myLeagues.length).toBe(3)
      expect(otherLeagues.length).toBe(1)
    }
  })
})
