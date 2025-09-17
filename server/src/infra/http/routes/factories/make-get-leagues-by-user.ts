import { GetLeaguesByUserUseCase } from '#domain/warrior-foot/application/use-cases/league/get-leagues-by-user.ts'
import { PrismaLeaguesRepository } from '#infra/database/prisma/repositories/prisma-leagues-repository.ts'
import { PrismaUsersRepository } from '#infra/database/prisma/repositories/prisma-users-repository.ts'
import { prisma } from '#infra/lib/prisma.ts'

const leaguesRepository = new PrismaLeaguesRepository(prisma)
const usersRepository = new PrismaUsersRepository(prisma)
const getLeaguesByUserUseCase = new GetLeaguesByUserUseCase(leaguesRepository, usersRepository)

export { getLeaguesByUserUseCase }
