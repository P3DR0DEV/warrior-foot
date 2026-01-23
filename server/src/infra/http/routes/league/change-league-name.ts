import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '#infra/http/hooks/check-jwt.ts'
import { errors } from '#infra/http/util/errors.ts'
import { changeLeagueNameUseCase } from '../factories/make-change-league-name.ts'

export const changeLeagueNameRoute: FastifyPluginAsyncZod = async (app) => {
  app.register(auth).patch(
    '/:leagueId/change-name',
    {
      schema: {
        tags: ['League'],
        summary: 'Change league name',
        description: 'This route allows the user to rename his league',
        body: z.object({
          name: z.string(),
        }),
        params: z.object({
          leagueId: z.uuid(),
        }),
        response: {
          201: z
            .object({
              message: z.string(),
            })
            .describe(`League's name changed successfully`),
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
            .describe('Resource not found error'),
          500: z
            .object({
              message: z.string(),
            })
            .describe('Internal Server error'),
        },
      },
    },
    async (request, reply) => {
      const { id: userId } = await request.getCurrentUser()

      const { leagueId } = request.params
      const { name } = request.body

      const response = await changeLeagueNameUseCase.execute({ leagueId, name, userId })

      if (response.isFailure()) {
        const { name, message } = response.reason

        throw new errors[name](message)
      }

      return reply.status(201).send({ message: 'League name changed successfully' })
    },
  )
}
