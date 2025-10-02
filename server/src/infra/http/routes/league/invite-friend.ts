import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '#infra/http/hooks/check-jwt.ts'
import { errors } from '#infra/http/util/errors.ts'
import { CacheRepository } from '#infra/lib/redis.ts'
import { getLeaguesByUserUseCase } from '../factories/make-get-leagues-by-user.ts'
import { inviteFriendsUseCase } from '../factories/make-invite-friends.ts'

const CACHE_EXPIRE = 72 * 60 * 60; // 72 hours

export const inviteFriendsRoute: FastifyPluginAsyncZod = async (app) => {
  app.register(auth).post(
    '/invite',
    {
      schema: {
        tags: ['League'],
        summary: 'Invite a friend to a league',
        description: 'This route invites friends to a league',
        body: z.object({
          name: z.string(),
          email: z.email(),
        }),
        response: {
          201: z
            .object({
              message: z.string(),
            })
            .describe('Email sent successfully'),
          400: z
            .object({
              name: z.string(),
              message: z.string(),
              errors: z.array(z.string()),
            })
            .describe('Zod Validation error'),
          404: z
            .object({
              name: z.string(),
              message: z.string(),
            })
            .describe('League not found error'),
          500: z
            .object({
              message: z.string(),
            })
            .describe('Internal Server error'),
        },
      },
    },
    async (request, reply) => {
      const { email, name } = request.body
      const { id, name: inviter } = await request.getCurrentUser()

      const league = await getLeaguesByUserUseCase.execute({ userId: id })

      if (league.isFailure()) {
        const { name, message } = league.reason

        throw new errors[name](message)
      }

      const { myLeagues } = league.value

      const response = await inviteFriendsUseCase.execute({ leagueId: myLeagues[0].id.toString(), email, inviter, name })

      if (response.isFailure()) {
        const { name, message } = response.reason

        if (name === 'ResourceNotFoundError') {
          throw new errors.ResourceNotFoundError(message)
        }

        throw new Error(message)
      }

      const { message } = response.value

      const inviteData = {
        name,
        email,
        inviter,
        code: myLeagues[0].code,
        created_at: new Date().toISOString(),
      }

      await CacheRepository.set(`invite:${myLeagues[0].code}`, JSON.stringify(inviteData), CACHE_EXPIRE)

      return reply.status(201).send({ message })
    },
  )
}
