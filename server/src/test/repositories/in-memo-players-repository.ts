import type { Player, PlayersRepository } from "#domain/warrior-foot/application/repositories/players-repository.ts";

export class InMemoryPlayersRepository implements PlayersRepository {
  public items: Player[] = []

  async findById(id: string): Promise<Player | null> {
    const player = this.items.find((item) => item.id.toValue() === id)

    if (!player) {
      return null
    }

    return player
  }
  
  async findByTeamId(teamId: string): Promise<Player[]> {
    const players = this.items.filter((player) => player.teamId.toValue() === teamId)

    return players
  }

  async create(player: Player): Promise<void> {
    this.items.push(player)
  }

}