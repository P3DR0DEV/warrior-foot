import { GetLeagueByIdUseCase } from "#domain/warrior-foot/application/use-cases/league/get-league-by-id.ts"
import { PrismaLeaguesRepository } from "#infra/database/prisma/repositories/prisma-leagues-repository.ts"
import { prisma } from "#infra/lib/prisma.ts"

const leaguesRepository = new PrismaLeaguesRepository(prisma)
const getLeagueByIdUseCase = new GetLeagueByIdUseCase(leaguesRepository)

export { getLeagueByIdUseCase }