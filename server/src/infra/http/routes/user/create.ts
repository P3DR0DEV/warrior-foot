import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { errors } from '#infra/http/util/errors.ts'
import { createLeagueUseCase } from '../factories/make-create-league.ts'
import { createUserUseCase } from '../factories/make-create-user.ts'
import { UserPresenter } from '../presenters/user-presenter.ts'

export const createUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/',
    {
      schema: {
        tags: ['User'],
        summary: 'Create a new user',
        description: 'This route creates a new user, when the user is created it will generate a League for the user.',
        body: z.object({
          name: z.string(),
          email: z.email(),
          password: z.string(),
          invitedBy: z.uuid().optional(),
        }),
        response: {
          201: z
            .object({
              user: z.object({
                id: z.uuid(),
                name: z.string(),
                email: z.string(),
              }),
            })
            .describe('User created successfully'),
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
            .describe('Already Registered Email'),
          500: z
            .object({
              message: z.string(),
            })
            .describe('Internal Server Error'),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, invitedBy } = request.body

      const response = await createUserUseCase.execute({
        name,
        email,
        password,
        invitedBy,
      })

      if (response.isFailure()) {
        const { name, message } = response.reason

        throw new errors[name](message)
      }

      const { user } = response.value

      const createLeagueResponse = await createLeagueUseCase.execute({
        name: 'New League',
        userId: user.id.toString(),
      })

      if (createLeagueResponse.isFailure()) {
        const { name, message } = createLeagueResponse.reason

        throw new errors[name](message)
      }

      return reply.status(201).send({ user: UserPresenter.toHTTP(user) })
    },
  )
}
