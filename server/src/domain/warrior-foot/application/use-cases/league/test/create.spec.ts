import { UniqueEntityId } from "#core/entities/unique-entity-id.ts"
import { makeUser } from "#test/factories/make-user.ts"
import  { InMemoryLeaguesRepository } from "#test/repositories/in-memo-leagues-repository.ts"
import  { InMemoryUsersRepository } from "#test/repositories/in-memo-users-repository.ts"
import  { CreateLeagueUseCase } from "../create.ts"

let usersRepository: InMemoryUsersRepository
let leaguesRepository: InMemoryLeaguesRepository
let sut: CreateLeagueUseCase

describe('Create League Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    leaguesRepository = new InMemoryLeaguesRepository()
    sut = new CreateLeagueUseCase(leaguesRepository, usersRepository)
  })

  it('should create a league', async () => {
    const user = makeUser()

    await usersRepository.create(user)

    const response = await sut.execute({
      name: 'Test League',
      userId: user.id.toString(),
    })

    expect(response.isSuccess()).toBeTruthy()

    if (response.isSuccess()) {
      const { league } = response.value

      expect(league.name).toBe('Test League')
      expect(league.userId.toValue()).toBe(user.id.toValue())
    }
  })

  it('should return a failure if the user is not found', async () => {
    const response = await sut.execute({
      name: 'Test League',
      userId: new UniqueEntityId().toString(),
    })

    expect(response.isFailure()).toBeTruthy()

    if (response.isFailure()) {
      const { name, message } = response.reason

      expect(name).toBe('ResourceNotFoundError')
      expect(message).toBe('The user referenced by the league was not found')
    }
  })  
})