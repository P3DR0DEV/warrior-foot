import { makeUser } from '#test/factories/make-user.ts'
import { InMemoryUsersRepository } from '#test/repositories/in-memo-users-repository.ts'
import { GetUserByEmailUseCase } from '../get-user-by-email.ts'

let usersRepository = new InMemoryUsersRepository()
let sut = new GetUserByEmailUseCase(usersRepository)

describe('GetUserByEmailUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserByEmailUseCase(usersRepository)
  })

  it('should return a user by email', async () => {
    const user = await makeUser()
    await usersRepository.create(user)

    const result = await sut.execute({ email: user.email })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { user: foundUser } = result.value
      expect(foundUser.id).toBe(user.id)
      expect(foundUser.name).toBe(user.name)
      expect(foundUser.email).toBe(user.email)
    }
  })

  it('should return a failure if the user was not found', async () => {
    const email = 'not-found@email.com'
    const result = await sut.execute({ email })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name, message } = result.reason

      expect(name).toBe('ResourceNotFoundError')
      expect(message).toBe(`The user with email ${email} was not found`)
    }
  })
})
