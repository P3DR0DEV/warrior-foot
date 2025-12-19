import { ChangeLeagueNameUseCase } from "#domain/warrior-foot/application/use-cases/league/change-league-name.ts";
import { DrizzleLeaguesRepository } from "#infra/database/drizzle/repositories/drizzle-leagues-repository.ts";
import { db } from "#infra/lib/drizzle.ts";

const leaguesRepository = new DrizzleLeaguesRepository(db)
const changeLeagueNameUseCase = new ChangeLeagueNameUseCase(leaguesRepository)

export { changeLeagueNameUseCase }