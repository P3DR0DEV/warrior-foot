import { success } from "#core/types/either.ts"
import { CreateLeagueUsersUseCase } from "#domain/warrior-foot/application/use-cases/league-users/create.ts"
import { PrismaLeagueUsersRepository } from "#infra/database/prisma/repositories/prisma-league-users-repository.ts"
import { PrismaLeaguesRepository } from "#infra/database/prisma/repositories/prisma-leagues-repository.ts"
import { PrismaUsersRepository } from "#infra/database/prisma/repositories/prisma-users-repository.ts"
import { errors } from "#infra/http/util/errors.ts"
import { prisma } from "#infra/lib/prisma.ts"

const usersRepository = new PrismaUsersRepository(prisma)
const leaguesRepository = new PrismaLeaguesRepository(prisma)
const leagueUsersRepository = new PrismaLeagueUsersRepository(prisma)


export async function acceptInviteUseCase(code: string, userId: string) {
  const league = await leaguesRepository.findByCode(code)

  if (!league) {
    throw new errors.ResourceNotFoundError('Invalid invite code')
  }

  const createLeagueUsersUseCase = new CreateLeagueUsersUseCase(leagueUsersRepository, leaguesRepository, usersRepository)

  const response = await createLeagueUsersUseCase.execute({ leagueId: league.id.toValue(), userId: userId, role: 'guest' })

  if (response.isFailure()) {
    const { name, message } = response.reason

    throw new errors[name](message)
  }

  const { leagueUser } = response.value


  return leagueUser
}
