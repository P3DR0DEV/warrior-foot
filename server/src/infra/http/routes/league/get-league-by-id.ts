import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { errors } from '#infra/http/util/errors.ts'
import { getLeagueByIdUseCase } from '../factories/make-get-league-by-id.ts'
import { LeaguePresenter } from '../presenters/league-presenter.ts'

export const getLeagueByIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:leagueId',
    {
      schema: {
        tags: ['League'],
        summary: 'Get league by id',
        description: 'This route returns a league by id',
        params: z.object({
          leagueId: z.uuid(),
        }),
        response: {
          200: z
            .object({
              league: z.object({
                id: z.uuid(),
                name: z.string(),
                code: z.string(),
                userId: z.string(),
                teams: z.array(
                  z.object({
                    id: z.uuid(),
                    name: z.string(),
                    division: z.string(),
                    primaryColor: z.string(),
                    secondaryColor: z.string(),
                  }),
                ),
              }),
            })
            .describe('League found successfully'),
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
      const { leagueId } = request.params

      const response = await getLeagueByIdUseCase.execute({ leagueId })

      if (response.isFailure()) {
        const { name, message } = response.reason

        throw new errors[name](message)
      }

      const { league } = response.value

      return reply.status(200).send({ league: LeaguePresenter.withTeams(league) })
    },
  )
}
