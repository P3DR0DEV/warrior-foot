import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '#infra/http/hooks/check-jwt.ts'
import { errors } from '#infra/http/util/errors.ts'
import { getLeagueByIdUseCase } from '../factories/make-get-league-by-id.ts'
import { initiateSeasonUseCase } from '../factories/make-initiate-season.ts'
import { LeaguePresenter } from '../presenters/league-presenter.ts'

export const initiateSeasonRoute: FastifyPluginAsyncZod = async (app) => {
  app.register(auth).post(
    '/:leagueId/new-season',
    {
      schema: {
        tags: ['League'],
        summary: 'Create new season for the referenced league',
        description: 'This route creates a new season for the referenced league',
        params: z.object({
          leagueId: z.uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id: userId } = await request.getCurrentUser()
      const { leagueId } = request.params

      const response = await getLeagueByIdUseCase.execute({ leagueId })

      if (response.isFailure()) {
        const { name, message } = response.reason

        throw new errors[name](message)
      }

      const { league } = response.value

      const { userId: ownerId } = league

      if (ownerId.toValue() !== userId) {
        throw new errors.UnauthorizedError('Only the owner of the league can create a new season')
      }

      await initiateSeasonUseCase.execute({ leagueId })

      return reply.status(200).send({ league: LeaguePresenter.withTeams(league) })
    },
  )
}
