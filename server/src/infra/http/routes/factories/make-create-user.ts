import { CreateUserUseCase } from '#domain/warrior-foot/application/use-cases/user/create.ts'
import { DrizzleUsersRepository } from '#infra/database/drizzle/repositories/drizzle-users-repository.ts'
import { db } from '#infra/lib/drizzle.ts'

const usersRepository = new DrizzleUsersRepository(db)
const createUserUseCase = new CreateUserUseCase(usersRepository)

export { createUserUseCase }
