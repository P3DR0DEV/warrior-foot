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
