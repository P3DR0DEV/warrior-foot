import { InviteFriendsUseCase } from '#domain/warrior-foot/application/use-cases/league/invite-friends.ts'
import { DrizzleLeaguesRepository } from '#infra/database/drizzle/repositories/drizzle-leagues-repository.ts'
import { db } from '#infra/lib/drizzle.ts'
import { NodemailerRepository } from '#infra/lib/nodemailer.ts'

const leaguesRepository = new DrizzleLeaguesRepository(db)
const mailRepository = new NodemailerRepository()
const inviteFriendsUseCase = new InviteFriendsUseCase(leaguesRepository, mailRepository)

export { inviteFriendsUseCase }
