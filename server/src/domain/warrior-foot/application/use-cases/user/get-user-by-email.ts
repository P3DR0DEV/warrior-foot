import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { User } from '#domain/warrior-foot/enterprise/entities/user.ts'
import type { UsersRepository } from '../../repositories/users-repository.ts'

interface GetUserByEmailUseCaseProps {
  email: string
}

type GetUserByEmailUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

export class GetUserByEmailUseCase {
  private readonly repository: UsersRepository

  constructor(repository: UsersRepository) {
    this.repository = repository
  }

  async execute({ email }: GetUserByEmailUseCaseProps): Promise<GetUserByEmailUseCaseResponse> {
    const user = await this.repository.findByEmail(email)

    if (!user) {
      return failure(ResourceNotFound(`The user with email ${email} was not found`))
    }

    return success({ user })
  }
}
