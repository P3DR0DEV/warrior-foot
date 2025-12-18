import { UniqueEntityId } from "#core/entities/unique-entity-id.ts"
import { Goalkeeper } from "#domain/warrior-foot/enterprise/entities/goalkeeper.ts"
import { Outfield } from "#domain/warrior-foot/enterprise/entities/outfield.ts"

type RawValue = {
  id: string
  name: string
  teamId: string
  position: 'goalkeeper' | 'outfield'
  isStar: boolean
  strength: number
  agility: number
  energy: number
  kick: number
  longKick: number
  pass: number
  longPass: number
  dribble: number | null
  jump: number | null
  reflexes: number | null
  createdAt: Date
  updatedAt: Date | null
}

export class DrizzlePlayersMapper {
  static toDomain(raw: RawValue) {
    const teamId = new UniqueEntityId(raw.teamId)

    const values = {
      name: raw.name,
      teamId,
      position: raw.position,
      isStar: raw.isStar,
      strength: raw.strength,
      agility: raw.agility,
      energy: raw.energy,
      kick: raw.kick,
      longKick: raw.longKick,
      pass: raw.pass,
      longPass: raw.longPass,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }

    if (raw.position === 'goalkeeper') {
      return Goalkeeper.create({
        ...values,
        position: 'goalkeeper',
        jump: raw.jump ?? 0,
        reflexes: raw.reflexes ?? 0,
      }, new UniqueEntityId(raw.id))
    } else {
      return Outfield.create({
        ...values,
        position: 'outfield',
        dribble: raw.dribble ?? 0,
      }, new UniqueEntityId(raw.id))
    }
  }

  static toPersistence(player: Goalkeeper | Outfield) {
    const isGoalkeeper = player.position === 'goalkeeper'

    return {
      id: player.id.toValue(),
      name: player.name,
      teamId: player.teamId.toValue(),
      position: player.position,
      isStar: player.isStar,
      strength: player.strength,
      agility: player.agility,
      energy: player.energy,
      kick: player.kick,
      longKick: player.longKick,
      pass: player.pass,
      longPass: player.longPass,
      dribble: isGoalkeeper ? null : player.dribble,
      jump: isGoalkeeper ? player.jump : null,
      reflexes: isGoalkeeper ? player.reflexes : null,
    }
  }
}

