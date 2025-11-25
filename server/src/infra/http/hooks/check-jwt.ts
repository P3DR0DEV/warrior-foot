import type { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { UnauthorizedError } from '../util/errors.ts'

type TokenPayload = {
  id: string
  name: string
  email: string
}

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    // Insert into request the methods to get the current user
    request.getCurrentUser = async () => {
      try {
        const { user } = await request.jwtVerify<{ user: TokenPayload }>()

        if (!user.email || !user.id || !user.name) {
          throw new UnauthorizedError('Invalid auth token.')
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      } catch (_error) {
        throw new UnauthorizedError('Invalid auth token.')
      }
    }
  })
})
