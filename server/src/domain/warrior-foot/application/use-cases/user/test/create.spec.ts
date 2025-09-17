import { makeUser } from '#test/factories/make-user.ts'
import { InMemoryUsersRepository } from '#test/repositories/in-memo-users-repository.ts'
import { CreateUserUseCase } from '../create.ts'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should return a success response', async () => {
    const response = await sut.execute({
      name: 'Pedro Mendes',
      email: 'pedro@mendes.com',
      password: '123456',
    })

    expect(response.isSuccess()).toBe(true)

    if (response.isSuccess()) {
      const { user } = response.value
      expect(user.name).toBe('Pedro Mendes')
      expect(user.email).toBe('pedro@mendes.com')
    }
  })

  it('should return a failure response if email is already registered', async () => {
    const email = 'pedro@mendes.com'
    usersRepository.items.push(await makeUser({ email }))

    const response = await sut.execute({
      name: 'Pedro Mendes',
      email,
      password: '123456',
    })

    expect(response.isFailure()).toBe(true)

    if (response.isFailure()) {
      const { name, message } = response.reason
      expect(name).toBe('AlreadyRegisteredEmailError')
      expect(message).toBe('The email pedro@mendes.com is already registered')
    }
  })
})
