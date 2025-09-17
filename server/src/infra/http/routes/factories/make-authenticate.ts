import { AuthenticateUserUseCase } from '#domain/warrior-foot/application/use-cases/auth/authenticate.ts'
import { PrismaUsersRepository } from '#infra/database/prisma/repositories/prisma-users-repository.ts'
import { prisma } from '#infra/lib/prisma.ts'

const usersRepository = new PrismaUsersRepository(prisma)
const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

export { authenticateUserUseCase }
