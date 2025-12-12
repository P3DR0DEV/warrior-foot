import { eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { Player, PlayersRepository } from '#domain/warrior-foot/application/repositories/players-repository.ts'
import { players } from '#infra/database/schemas/players.ts'
import { DrizzlePlayersMapper } from '../mappers/drizzle-players-mapper.ts'

export class DrizzlePlayersRepository implements PlayersRepository {
  private drizzle: NodePgDatabase

  constructor(drizzle: NodePgDatabase) {
    this.drizzle = drizzle
  }

  async findById(id: string): Promise<Player | null> {
    const response = await this.drizzle.select().from(players).where(eq(players.id, id))

    if (response.length === 0) {
      return null
    }

    const player = response[0]

    return DrizzlePlayersMapper.toDomain(player)
  }

  async findByTeamId(teamId: string): Promise<Player[]> {
    const response = await this.drizzle.select().from(players).where(eq(players.teamId, teamId))

    return response.map(DrizzlePlayersMapper.toDomain)
  }

  async create(player: Player): Promise<void> {
    const data = DrizzlePlayersMapper.toPersistence(player)

    await this.drizzle.insert(players).values(data)
  }
}
