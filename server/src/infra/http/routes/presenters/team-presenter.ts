import type { Player } from "#domain/warrior-foot/application/repositories/players-repository.ts"
import type { Team } from "#domain/warrior-foot/enterprise/entities/team.ts"

type TeamWithPlayers = {
  id: Team['id']
  name: Team['name']
  division: Team['division']
  leagueId: Team['leagueId']
  primaryColor: Team['primaryColor']
  secondaryColor: Team['secondaryColor']
  players: Player[]
}

export class TeamPresenter {
  static toHTTP(team: TeamWithPlayers) {
    return {
      id: team.id.toString(),
      name: team.name,
      division: team.division,
      leagueId: team.leagueId.toString(),
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      players: team.players.map((player) => {
        return {
          id: player.id.toString(),
          name: player.name,
          position: player.position,
          isStar: player.isStar,
          strength: player.strength,
          agility: player.agility,
          energy: player.energy,
          kick: player.kick,
          longKick: player.longKick,
          pass: player.pass,
          longPass: player.longPass,
          dribble: player.position === 'goalkeeper' ? null : player.dribble,
          jump: player.position === 'goalkeeper' ? player.jump : null,
          reflexes: player.position === 'goalkeeper' ? player.reflexes : null,
        }
      })
    }
  }
}