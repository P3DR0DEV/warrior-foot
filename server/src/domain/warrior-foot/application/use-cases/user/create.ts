import { AlreadyRegisteredEmail, type AlreadyRegisteredEmailError } from '#core/errors/already-registered-email.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { UsersRepository } from '#domain/warrior-foot/application/repositories/users-repository.ts'
import { User } from '#domain/warrior-foot/enterprise/entities/user.ts'

interface CreateUserProps {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<AlreadyRegisteredEmailError, { user: User }>

export class CreateUserUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute({ name, email, password }: CreateUserProps): Promise<CreateUserUseCaseResponse> {
    const isEmailAlreadyRegistered = await this.repository.findByEmail(email)

    if (isEmailAlreadyRegistered) {
      return failure(AlreadyRegisteredEmail(`The email ${email} is already registered`))
    }

    const user = User.create({ name, email, password })

    await this.repository.create(user)

    return success({ user })
  }
}
