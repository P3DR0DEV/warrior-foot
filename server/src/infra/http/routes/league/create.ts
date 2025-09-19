import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '#infra/http/hooks/check-jwt.ts'
import { errors } from '#infra/http/util/errors.ts'
import { createLeagueUseCase } from '../factories/make-create-league.ts'
import { LeaguePresenter } from '../presenters/league-presenter.ts'

export const createNewLeagueRoute: FastifyPluginAsyncZod = async (app) => {
  app.register(auth).post(
    '/',
    {
      schema: {
        tags: ['League'],
        summary: 'Create a new league',
        description: 'This route creates a new league in warrior foot',
        body: z.object({
          name: z.string(),
          userId: z.string(),
        }),
        response: {
          201: z
            .object({
              league: z.object({
                id: z.uuid(),
                name: z.string(),
                code: z.string(),
                userId: z.string(),
              }),
            })
            .describe('League created successfully'),
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
      await request.getCurrentUser()
      
      const { name, userId } = request.body

      const response = await createLeagueUseCase.execute({
        name,
        userId,
      })

      if (response.isFailure()) {
        const { name, message } = response.reason

        throw new errors[name](message)
      }

      const { league } = response.value

      return reply.status(201).send({ league: LeaguePresenter.toHTTP(league) })
    },
  )
}
