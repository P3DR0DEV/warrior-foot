import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { errors } from '#infra/http/util/errors.ts'
import { CacheRepository } from '#infra/lib/redis.ts'
import { acceptInviteUseCase } from '../factories/make-accept-invite.ts'

export const acceptInviteRoute: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    '/invite/:code/accept',
    {
      schema: {
        tags: ['League'],
        summary: 'Accept invite',
        description: 'This route accepts an invite',
        params: z.object({
          code: z.string(),
        }),
        body: z.object({
          userId: z.uuid(),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
            })
            .describe('Invite accepted successfully'),
          400: z
            .object({
              name: z.string(),
              message: z.string(),
              errors: z.array(z.string()),
            })
            .describe('Zod Validation error'),
          500: z
            .object({
              message: z.string(),
            })
            .describe('Internal Server error'),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.params

      const inviteData = (await CacheRepository.get(`invite:${code}`)) as {
        name: string
        email: string
        inviter: string
        code: string
        created_at: string
      } | null

      if (!inviteData) {
        throw new errors.ResourceNotFoundError('Invalid invite code')
      }

      const { userId } = request.body

      await acceptInviteUseCase(code, userId)

      await CacheRepository.delete(`invite:${code}`)

      return reply.status(200).send({ message: 'Invite accepted successfully' })
    },
  )
}
