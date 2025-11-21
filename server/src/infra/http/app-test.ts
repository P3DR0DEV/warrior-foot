import type { FastifyInstance } from 'fastify'
import { cleanupDatabase, setupDatabase } from '#test/setup-e2e.ts'

let app: FastifyInstance

beforeAll(async () => {
  await setupDatabase()
  const server = await import('./app.ts')
  await server.app.ready()
  app = server.app
})

afterAll(async () => {
  await cleanupDatabase()
})

export { app }
