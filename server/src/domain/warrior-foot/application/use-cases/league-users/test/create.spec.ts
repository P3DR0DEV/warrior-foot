import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { makeLeague } from '#test/factories/make-league.ts'
import { makeUser } from '#test/factories/make-user.ts'
import { InMemoryLeagueUsersRepository } from '#test/repositories/in-memo-league-users-repository.ts'
import { InMemoryLeaguesRepository } from '#test/repositories/in-memo-leagues-repository.ts'
import { InMemoryUsersRepository } from '#test/repositories/in-memo-users-repository.ts'
import { CreateLeagueUsersUseCase } from '../create.ts'

let leaguesRepository: InMemoryLeaguesRepository
let usersRepository: InMemoryUsersRepository
let leagueUsersRepository: InMemoryLeagueUsersRepository
let sut: CreateLeagueUsersUseCase

describe('Create league user use case', () => {
  beforeEach(() => {
    leaguesRepository = new InMemoryLeaguesRepository()
    usersRepository = new InMemoryUsersRepository()
    leagueUsersRepository = new InMemoryLeagueUsersRepository()
    sut = new CreateLeagueUsersUseCase(leagueUsersRepository, leaguesRepository, usersRepository)
  })

  it('should create a league user with owner role', async () => {
    const league = makeLeague()
    const user = await makeUser()

    await leaguesRepository.create(league)
    await usersRepository.create(user)

    const response = await sut.execute({
      leagueId: league.id.toString(),
      userId: user.id.toString(),
      role: 'owner',
    })

    expect(response.isSuccess()).toBeTruthy()

    if (response.isSuccess()) {
      const { leagueUser } = response.value

      expect(leagueUser.leagueId.toValue()).toBe(league.id.toValue())
      expect(leagueUser.userId.toValue()).toBe(user.id.toValue())
      expect(leagueUser.role).toBe('owner')
    }
  })

  it('should return a failure if the user is not found', async () => {
    const league = makeLeague()

    await leaguesRepository.create(league)

    const response = await sut.execute({
      leagueId: league.id.toString(),
      userId: new UniqueEntityId().toString(),
      role: 'owner',
    })

    expect(response.isFailure()).toBeTruthy()

    if (response.isFailure()) {
      const { name, message } = response.reason

      expect(name).toBe('ResourceNotFoundError')
      expect(message).toBe('The user referenced by the league was not found')
    }
  })

  it('should return a failure if the league is not found', async () => {
    const user = await makeUser()

    await usersRepository.create(user)

    const response = await sut.execute({
      leagueId: new UniqueEntityId().toString(),
      userId: user.id.toString(),
      role: 'owner',
    })

    expect(response.isFailure()).toBeTruthy()

    if (response.isFailure()) {
      const { name, message } = response.reason

      expect(name).toBe('ResourceNotFoundError')
      expect(message).toBe('The league referenced was not found')
    }
  })
})
