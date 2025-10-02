import type { FastifyInstance } from 'fastify'
import { acceptInviteRoute } from './accept-invite.ts'
import { createNewLeagueRoute } from './create.ts'
import { getLeagueByIdRoute } from './get-league-by-id.ts'
import { getLeaguesByUserRoute } from './get-leagues-by-user.ts'
import { inviteFriendsRoute } from './invite-friend.ts'
import { verifyInviteRoute } from './verify-invite.ts'

export async function leagueRoutes(app: FastifyInstance) {
  app.register(createNewLeagueRoute)
  app.register(getLeagueByIdRoute)
  app.register(getLeaguesByUserRoute)
  app.register(inviteFriendsRoute)
  app.register(verifyInviteRoute)
  app.register(acceptInviteRoute)
}
