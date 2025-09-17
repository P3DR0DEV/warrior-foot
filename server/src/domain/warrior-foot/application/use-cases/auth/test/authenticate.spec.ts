import { makeUser } from "#test/factories/make-user.ts"
import { InMemoryUsersRepository } from "#test/repositories/in-memo-users-repository.ts"
import { AuthenticateUserUseCase } from "../authenticate.ts"

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
  })

  it('should return a success response', async () => {
    const user = await makeUser({
      email: 'pedro@mendes.com',
      password: '123456',
    })

    await usersRepository.create(user)

    const response = await sut.execute({
      email: 'pedro@mendes.com',
      password: '123456',
    })

    expect(response.isSuccess()).toBe(true)

    if (response.isSuccess()) {
      const { user } = response.value
      expect(user.name).toBe(user.name)
      expect(user.email).toBe('pedro@mendes.com')
    }
  })

  it('should return a failure response if email is not found', async () => {
    const email = 'not-found@email.com'
    const response = await sut.execute({ email, password: '123456' })

    expect(response.isFailure()).toBe(true)

    if (response.isFailure()) {
      const { name, message } = response.reason

      expect(name).toBe('InvalidCredentialsError')
      expect(message).toBe('Invalid credentials')
    }
  })

  it('should return a failure response if password is not valid', async () => {
    const email = 'pedro@mendes.com'
    const password = '123456'
    const response = await sut.execute({ email, password })

    expect(response.isFailure()).toBe(true)

    if (response.isFailure()) {
      const { name, message } = response.reason

      expect(name).toBe('InvalidCredentialsError')
      expect(message).toBe('Invalid credentials')
    }
  })
})