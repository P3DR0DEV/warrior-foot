import type { FastifyInstance } from "fastify"
import { getTeamByIdRoute } from "./get-team-by-id.ts"

export function teamsRoutes(app: FastifyInstance) {
  app.register(getTeamByIdRoute)
}