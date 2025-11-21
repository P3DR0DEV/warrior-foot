import { CreateLeagueUsersUseCase } from '#domain/warrior-foot/application/use-cases/league-users/create.ts'
import { DrizzleLeagueUsersRepository } from '#infra/database/drizzle/repositories/drizzle-league-users-repository.ts'
import { DrizzleLeaguesRepository } from '#infra/database/drizzle/repositories/drizzle-leagues-repository.ts'
import { DrizzleUsersRepository } from '#infra/database/drizzle/repositories/drizzle-users-repository.ts'
import { errors } from '#infra/http/util/errors.ts'
import { db } from '#infra/lib/drizzle.ts'

const usersRepository = new DrizzleUsersRepository(db)
const leaguesRepository = new DrizzleLeaguesRepository(db)
const leagueUsersRepository = new DrizzleLeagueUsersRepository(db)

export async function acceptInviteUseCase(code: string, userId: string) {
  const league = await leaguesRepository.findByCode(code)

  if (!league) {
    throw new errors.ResourceNotFoundError('Invalid invite code')
  }

  const createLeagueUsersUseCase = new CreateLeagueUsersUseCase(
    leagueUsersRepository,
    leaguesRepository,
    usersRepository,
  )

  const response = await createLeagueUsersUseCase.execute({
    leagueId: league.id.toValue(),
    userId: userId,
    role: 'guest',
  })

  if (response.isFailure()) {
    const { name, message } = response.reason

    throw new errors[name](message)
  }

  const { leagueUser } = response.value

  return leagueUser
}
