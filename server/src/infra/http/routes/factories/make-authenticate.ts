import { AuthenticateUserUseCase } from '#domain/warrior-foot/application/use-cases/auth/authenticate.ts'
import { DrizzleUsersRepository } from '#infra/database/drizzle/repositories/drizzle-users-repository.ts'
import { db } from '#infra/lib/drizzle.ts'


const usersRepository = new DrizzleUsersRepository(db)
const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

export { authenticateUserUseCase }
