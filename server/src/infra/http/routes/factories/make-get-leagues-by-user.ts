import { GetLeaguesByUserUseCase } from '#domain/warrior-foot/application/use-cases/league/get-leagues-by-user.ts'
import { PrismaLeagueUsersRepository } from '#infra/database/prisma/repositories/prisma-league-users-repository.ts'
import { PrismaLeaguesRepository } from '#infra/database/prisma/repositories/prisma-leagues-repository.ts'
import { PrismaUsersRepository } from '#infra/database/prisma/repositories/prisma-users-repository.ts'
import { prisma } from '#infra/lib/prisma.ts'

const leaguesRepository = new PrismaLeaguesRepository(prisma)
const usersRepository = new PrismaUsersRepository(prisma)
const leagueUsersRepository = new PrismaLeagueUsersRepository(prisma)
const getLeaguesByUserUseCase = new GetLeaguesByUserUseCase(leaguesRepository, usersRepository, leagueUsersRepository)

export { getLeaguesByUserUseCase }
