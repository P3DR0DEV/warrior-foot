import type { FastifyInstance } from "fastify";
import { createNewLeagueRoute } from "./create.ts";
import { getLeaguesByUserRoute } from "./get-leagues-by-user.ts";

export async function leagueRoutes(app: FastifyInstance) {
  app.register(createNewLeagueRoute)
  app.register(getLeaguesByUserRoute)
}