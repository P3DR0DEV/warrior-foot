import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { errors } from '#infra/http/util/errors.ts'
import { getLeaguesByUserUseCase } from '../factories/make-get-leagues-by-user.ts'
import { LeaguePresenter } from '../presenters/league-presenter.ts'

export const getLeaguesByUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:userId',
    {
      schema: {
        tags: ['League'],
        summary: 'Get leagues by user',
        description: 'This route returns a list of leagues for a given user',
        params: z.object({
          userId: z.uuid(),
        }),
        response: {
          200: z
            .object({
              leagues: z.array(z.object({
                id: z.uuid(),
                name: z.string(),
                code: z.string(),
                userId: z.string(),
              })),
            })
            .describe('Leagues list for the user'),
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
            .describe('User not found error'),
          500: z
            .object({
              message: z.string(),
            })
            .describe('Internal Server error'),
        },
      },
    },
    async (request, reply) => {
      const { userId } = request.params

      const response = await getLeaguesByUserUseCase.execute({ userId })

      if (response.isFailure()) {
        const { name, message } = response.reason

        throw new errors[name](message)
      }

      const { leagues } = response.value

      return reply.status(200).send({ leagues: leagues.map(LeaguePresenter.toHTTP) })
    },
  )
}
