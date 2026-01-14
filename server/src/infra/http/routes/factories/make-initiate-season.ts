import { InitiateSeasonUseCase } from "#domain/warrior-foot/application/use-cases/league/initiate-season.ts"
import { DrizzleLeaguesRepository } from "#infra/database/drizzle/repositories/drizzle-leagues-repository.ts"
import { DrizzleTeamsRepository } from "#infra/database/drizzle/repositories/drizzle-teams-repository.ts"
import { db } from "#infra/lib/drizzle.ts"

const leaguesRepository = new DrizzleLeaguesRepository(db)
const teamsRepository = new DrizzleTeamsRepository(db)
const initiateSeasonUseCase = new InitiateSeasonUseCase(leaguesRepository, teamsRepository)

export { initiateSeasonUseCase }