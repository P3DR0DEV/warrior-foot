import { GetLeagueByIdUseCase } from '#domain/warrior-foot/application/use-cases/league/get-league-by-id.ts'
import { DrizzleLeaguesRepository } from '#infra/database/drizzle/repositories/drizzle-leagues-repository.ts'
import { DrizzleTeamsRepository } from '#infra/database/drizzle/repositories/drizzle-teams-repository.ts'
import { db } from '#infra/lib/drizzle.ts'

const leaguesRepository = new DrizzleLeaguesRepository(db)
const teamsRepository = new DrizzleTeamsRepository(db)
const getLeagueByIdUseCase = new GetLeagueByIdUseCase(leaguesRepository, teamsRepository)

export { getLeagueByIdUseCase }
