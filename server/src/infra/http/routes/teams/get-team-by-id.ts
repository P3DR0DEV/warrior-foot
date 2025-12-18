import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { errors } from '#infra/http/util/errors.ts'
import { getTeamByIdUseCase } from '../factories/make-get-team-by-id.ts'
import { TeamPresenter } from '../presenters/team-presenter.ts'

export const getTeamByIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:id',
    {
      schema: {
        tags: ['Team'],
        summary: 'Get team by id',
        description: 'This route returns a team by his id',
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.object({
            team: z.object({
              id: z.string(),
              name: z.string(),
              division: z.enum(['A', 'B', 'C', 'D']),
              leagueId: z.string(),
              primaryColor: z.string(),
              secondaryColor: z.string(),
              players: z.array(z.object({
                id: z.string(),
                name: z.string(),
                position: z.enum(['goalkeeper', 'outfield']),
                isStar: z.boolean(),
                strength: z.number(),
                agility: z.number(),
                energy: z.number(),
                kick: z.number(),
                longKick: z.number(),
                pass: z.number(),
                longPass: z.number(),
                dribble: z.number().nullable(),
                jump: z.number().nullable(),
                reflexes: z.number().nullable(),
                value: z.number(),
                stamina: z.number(),
              })),
            }),
          }),
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
        }
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const response = await getTeamByIdUseCase.execute({ id })

      if (response.isFailure()) {
        const { name, message } = response.reason

        throw new errors[name](message)
      }

      const { team } = response.value

      return reply.status(200).send({ team: TeamPresenter.toHTTP(team) })
    },
  )
}
