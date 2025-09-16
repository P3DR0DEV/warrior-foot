import type { FastifyInstance } from "fastify";
import { createNewLeagueRoute } from "./create.ts";

export async function leagueRoutes(app: FastifyInstance) {
  app.register(createNewLeagueRoute)
}