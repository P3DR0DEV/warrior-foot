import type { Goalkeeper } from "#domain/warrior-foot/enterprise/entities/goalkeeper.ts"
import type { Outfield } from "#domain/warrior-foot/enterprise/entities/outfield.ts"

export type Player = Goalkeeper | Outfield

export interface PlayersRepository {
  findById(id: string): Promise<Player | null>
  findByTeamId(teamId: string): Promise<Player[]>

  create(player: Player): Promise<void>
  createMany(players: Player[]): Promise<void>
}