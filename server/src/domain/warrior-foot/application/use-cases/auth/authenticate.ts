import { HashPassword } from '#core/entities/hash-password.ts'
import { InvalidCredentials, type InvalidCredentialsError } from '#core/errors/invalid-credentials.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import { UserPresenter } from '#infra/http/routes/presenters/user-presenter.ts'
import type { UsersRepository } from '../../repositories/users-repository.ts'

interface AuthenticateUserUseCaseProps {
  email: string
  password: string
}

type UserForPayload = {
  id: string
  name: string
  email: string
}

type AuthenticateUserUseCaseResponse = Either<InvalidCredentialsError, { user: UserForPayload }>

export class AuthenticateUserUseCase {
  private readonly repository: UsersRepository

  constructor(repository: UsersRepository) {
    this.repository = repository
  }

  async execute({ email, password }: AuthenticateUserUseCaseProps): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.repository.findByEmail(email)
    if (!user) {
      return failure(InvalidCredentials('Invalid credentials'))
    }

    const isPasswordValid = await HashPassword.compare(password, user.password)

    if (!isPasswordValid) {
      return failure(InvalidCredentials('Invalid credentials'))
    }

    return success({
      user: UserPresenter.toHTTP(user),
     })
  }
}
