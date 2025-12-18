import { GetTeamByIdUseCase } from "#domain/warrior-foot/application/use-cases/team/get-team-by-id.ts"
import { DrizzlePlayersRepository } from "#infra/database/drizzle/repositories/drizzle-players-repository.ts"
import { DrizzleTeamsRepository } from "#infra/database/drizzle/repositories/drizzle-teams-repository.ts"
import { db } from "#infra/lib/drizzle.ts"

const teamsRepository = new DrizzleTeamsRepository(db)
const playersRepository = new DrizzlePlayersRepository(db)

const getTeamByIdUseCase = new GetTeamByIdUseCase(teamsRepository, playersRepository)

export { getTeamByIdUseCase }