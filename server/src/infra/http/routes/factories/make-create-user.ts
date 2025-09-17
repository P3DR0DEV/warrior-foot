import { CreateUserUseCase } from "#domain/warrior-foot/application/use-cases/user/create.ts"
import { PrismaUsersRepository } from "#infra/database/prisma/repositories/prisma-users-repository.ts"
import { prisma } from "#infra/lib/prisma.ts"

const usersRepository = new PrismaUsersRepository(prisma)
const createUserUseCase = new CreateUserUseCase(usersRepository)

export { createUserUseCase }