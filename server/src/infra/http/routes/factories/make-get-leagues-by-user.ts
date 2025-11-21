import { GetLeaguesByUserUseCase } from '#domain/warrior-foot/application/use-cases/league/get-leagues-by-user.ts'
import { DrizzleLeagueUsersRepository } from '#infra/database/drizzle/repositories/drizzle-league-users-repository.ts'
import { DrizzleLeaguesRepository } from '#infra/database/drizzle/repositories/drizzle-leagues-repository.ts'
import { DrizzleUsersRepository } from '#infra/database/drizzle/repositories/drizzle-users-repository.ts'
import { db } from '#infra/lib/drizzle.ts'

const leaguesRepository = new DrizzleLeaguesRepository(db)
const usersRepository = new DrizzleUsersRepository(db)
const leagueUsersRepository = new DrizzleLeagueUsersRepository(db)
const getLeaguesByUserUseCase = new GetLeaguesByUserUseCase(leaguesRepository, usersRepository, leagueUsersRepository)

export { getLeaguesByUserUseCase }
