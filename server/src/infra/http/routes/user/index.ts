import type { FastifyInstance } from 'fastify'
import { createUserRoute } from './create.ts'

export async function userRoutes(app: FastifyInstance) {
  app.register(createUserRoute)
}
