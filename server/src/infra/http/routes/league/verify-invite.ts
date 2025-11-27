import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { errors } from '#infra/http/util/errors.ts'
import { CacheRepository } from '#infra/lib/redis.ts'

export const verifyInviteRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/verify/:code',
    {
      schema: {
        tags: ['League'],
        summary: 'Verify invite',
        description: 'This route verifies if an invite is valid',
        params: z.object({
          code: z.string(),
        }),
        response: {
          200: z
            .object({
              data: z.object({
                name: z.string(),
                email: z.email(),
                inviter: z.object({
                  id: z.uuid(),
                  name: z.string(),
                }),
                code: z.string(),
                created_at: z.coerce.date(),
              }),
            })
            .describe('Valid invite code'),
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
        inviter: {
          id: string
          name: string
        }
        code: string
        created_at: string
      } | null

      if (!inviteData) {
        throw new errors.ResourceNotFoundError('Invalid invite code')
      }

      return reply.status(200).send({
        data: inviteData,
      })
    },
  )
}
