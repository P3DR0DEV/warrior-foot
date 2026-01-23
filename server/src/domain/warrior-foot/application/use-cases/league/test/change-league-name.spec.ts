import { makeLeague } from "#test/factories/make-league.ts"
import { makeUser } from "#test/factories/make-user.ts"
import { InMemoryLeaguesRepository } from "#test/repositories/in-memo-leagues-repository.ts"
import { InMemoryUsersRepository } from "#test/repositories/in-memo-users-repository.ts"
import { ChangeLeagueNameUseCase } from "../change-league-name.ts"

let usersRepository: InMemoryUsersRepository
let leaguesRepository: InMemoryLeaguesRepository
let sut: ChangeLeagueNameUseCase

describe('Change League Name Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    leaguesRepository = new InMemoryLeaguesRepository()
    sut = new ChangeLeagueNameUseCase(leaguesRepository)
  })

  it('should change the name of a league', async () => {
    const user = await makeUser()
    await usersRepository.create(user)
    const league = makeLeague({ userId: user.id })
    await leaguesRepository.create(league)

    const response = await sut.execute({ leagueId: league.id.toString(), name: 'Liga nova', userId: user.id.toString() })

    expect(response.isSuccess()).toBe(true)

    if (response.isSuccess()) {
      const { league } = response.value
      expect(league.name).toBe('Liga nova')
    }
  })

  it('should return a failure if the user is not the owner of the league', async () => {
    const user = await makeUser()
    await usersRepository.create(user)
    const league = makeLeague({ userId: user.id })
    await leaguesRepository.create(league)

    const secondUser = await makeUser()
    await usersRepository.create(secondUser)

    const response = await sut.execute({ leagueId: league.id.toString(), name: 'Liga nova', userId: secondUser.id.toString() })

    expect(response.isFailure()).toBe(true)

    if (response.isFailure()) {
      const { name, message } = response.reason
      expect(name).toBe('UnauthorizedResourceAccessError')
      expect(message).toBe('Only the owner of the league can change its name')
    }
  })
})