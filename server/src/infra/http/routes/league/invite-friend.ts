import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '#infra/http/hooks/check-jwt.ts'
import { errors } from '#infra/http/util/errors.ts'
import { inviteFriendsUseCase } from '../factories/make-invite-friends.ts'

export const inviteFriendsRoute: FastifyPluginAsyncZod = async (app) => {
  app.register(auth).post(
    '/:leagueId/invite',
    {
      schema: {
        tags: ['League'],
        summary: 'Invite a friend to a league',
        description: 'This route invites friends to a league',
        security: [{ bearerAuth: [] }],
        params: z.object({
          leagueId: z.uuid(),
        }),
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
      const { leagueId } = request.params
      const { email, name } = request.body
      const { name: inviter } = await request.getCurrentUser()

      const response = await inviteFriendsUseCase.execute({ leagueId, email, inviter, name })

      if (response.isFailure()) {
        const { name, message } = response.reason

        if (name === 'ResourceNotFoundError') {
          throw new errors.ResourceNotFoundError(message)
        }

        throw new Error(message)
      }

      const { message } = response.value

      return reply.status(201).send({ message: `Email ${message} sent successfully` })
    },
  )
}
