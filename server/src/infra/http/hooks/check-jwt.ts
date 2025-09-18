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
        const { email, id, name } = await request.jwtVerify<TokenPayload>()

        if ( !email || !id || !name) {
          throw new UnauthorizedError('Invalid auth token.')
        }

        return {
          id,
          name,
          email,
        }
      } catch (_error) {
        throw new UnauthorizedError('Invalid auth token.')
      }
    }
  })
})
