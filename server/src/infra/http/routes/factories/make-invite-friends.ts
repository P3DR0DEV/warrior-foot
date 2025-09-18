import { InviteFriendsUseCase } from "#domain/warrior-foot/application/use-cases/league/invite-friends.ts";
import { PrismaLeaguesRepository } from "#infra/database/prisma/repositories/prisma-leagues-repository.ts";
import { NodemailerRepository } from "#infra/lib/nodemailer.ts";
import { prisma } from "#infra/lib/prisma.ts";

const leaguesRepository = new PrismaLeaguesRepository(prisma)
const mailRepository = new NodemailerRepository()
const inviteFriendsUseCase = new InviteFriendsUseCase(leaguesRepository, mailRepository)

export { inviteFriendsUseCase }