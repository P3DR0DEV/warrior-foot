import { CreateLeagueUseCase } from '#domain/warrior-foot/application/use-cases/league/create.ts'
import { DrizzleLeaguesRepository } from '#infra/database/drizzle/repositories/drizzle-leagues-repository.ts'
import { DrizzleUsersRepository } from '#infra/database/drizzle/repositories/drizzle-users-repository.ts'
import { db } from '#infra/lib/drizzle.ts'

const usersRepository = new DrizzleUsersRepository(db)
const leaguesRepository = new DrizzleLeaguesRepository(db)
const createLeagueUseCase = new CreateLeagueUseCase(leaguesRepository, usersRepository)

export { createLeagueUseCase }
