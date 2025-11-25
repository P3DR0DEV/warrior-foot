import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { errors } from '#infra/http/util/errors.ts'
import { authenticateUserUseCase } from '../factories/make-authenticate.ts'

export const signInRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/sign-in',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Sign in',
        description: 'This route allows you to sign in',
        body: z.object({
          email: z.email(),
          password: z.string(),
        }),
        response: {
          200: z
            .object({
              token: z.string(),
            })
            .describe('Sign in response'),
          400: z
            .object({
              name: z.string(),
              message: z.string(),
              errors: z.array(z.string()),
            })
            .describe('Zod Validation error'),
          401: z
            .object({
              name: z.string(),
              message: z.string(),
            })
            .describe('Unauthorized error'),
          500: z
            .object({
              message: z.string(),
            })
            .describe('Internal Server error'),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const response = await authenticateUserUseCase.execute({ email, password })

      if (response.isFailure()) {
        const { name, message } = response.reason

        throw new errors[name](message)
      }

      const { user } = response.value

      const token = await reply.jwtSign(
        {
          user,
        },
        {
          expiresIn: '7d',
        },
      )

      return reply.status(200).send({ token })
    },
  )
}
