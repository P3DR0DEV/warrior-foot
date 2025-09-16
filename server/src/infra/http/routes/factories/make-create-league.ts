import { CreateLeagueUseCase } from '#domain/warrior-foot/application/use-cases/league/create.ts'
import { PrismaLeaguesRepository } from '#infra/database/prisma/repositories/prisma-leagues-repository.ts'
import { PrismaUsersRepository } from '#infra/database/prisma/repositories/prisma-users-repository.ts'
import { prisma } from '#infra/lib/prisma.ts'

const usersRepository = new PrismaUsersRepository(prisma)
const leaguesRepository = new PrismaLeaguesRepository(prisma)
const createLeagueUseCase = new CreateLeagueUseCase(leaguesRepository, usersRepository)

export { createLeagueUseCase }
