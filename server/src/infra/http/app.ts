import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import scalarApiReference from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { env } from '#infra/env/index.ts'
import { errorHandler } from './error-handler.ts'
import { signInRoute } from './routes/auth/sign-in.ts'
import { leagueRoutes } from './routes/league/index.ts'
import { userRoutes } from './routes/user/index.ts'

const app = fastify({
  logger:
    env.NODE_ENV === 'development' || env.NODE_ENV === 'test'
      ? undefined
      : {
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: 'SYS:h:MM:ss TT Z',
              ignore: 'pid,hostname',
            },
          },
        },
}).withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

if (process.env.NODE_ENV === 'development') {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Warrior Foot API',
        description: 'This Api is for the Warrior Foot game',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })

  app.register(scalarApiReference, {
    routePrefix: '/docs',
    configuration: {
      theme: 'kepler',
    },
  })
}

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.get('/health', async (_request, reply) => {
  return reply.status(200).send({
    name: 'WarriorFoot API',
    version: '1.0.0',
    description: 'WarriorFoot API',
    status: 'OK',
  })
})

app.register(userRoutes, { prefix: '/users' })
app.register(leagueRoutes, { prefix: '/leagues' })
app.register(signInRoute, { prefix: '/auth' })

app.setErrorHandler(errorHandler)

export { app }
