import { Entity } from '#core/entities/entity.ts'
import type { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import type { Optional } from '#core/types/optional.ts'
import type { PlayerProps } from './player.ts'

type Division = 'A' | 'B' | 'C' | 'D'

export interface GoalkeeperProps extends PlayerProps {
  teamId: UniqueEntityId
  position: 'goalkeeper'
  jump: number
  reflexes: number
  createdAt: Date
}

export class Goalkeeper extends Entity<GoalkeeperProps> {
  static create(props: Optional<GoalkeeperProps, 'createdAt'>, id?: UniqueEntityId): Goalkeeper {
    const player = new Goalkeeper(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return player
  }

  getCurrentPlayerMarketValue(division: Division) {
    const mapEqualizer = {
      A: 1,
      B: 10,
      C: 100,
      D: 1000,
    }

    const equalizer = mapEqualizer[division]

    const PRICEPERSTAT = 60000000.00 //  R$ 60.000.000,00

    const playerStats = {
      strength: this.strength,
      agility: this.agility,
      energy: this.energy,
      kick: this.kick,
      longKick: this.longKick,
      pass: this.pass,
      longPass: this.longPass,
      jump: this.jump,
      reflexes: this.reflexes,
    }

    const totalStats = Object.values(playerStats).reduce((sum, value) => sum + value, 0)

    console.log(totalStats)

    let playerMaxValuePerStat = 0
    if (this.isStar) {
      playerMaxValuePerStat = PRICEPERSTAT / equalizer
    } else {
      playerMaxValuePerStat = PRICEPERSTAT * 0.9 / equalizer
    }

    return playerMaxValuePerStat * totalStats
  }

  getPlayerStamina(division: Division) {
    const map = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
    }

    const stamina = this.energy * (4 / map[division])

    return stamina
  }

  get name() {
    return this.props.name
  }

  get strength() {
    return this.props.strength
  }

  get agility() {
    return this.props.agility
  }

  get energy() {
    return this.props.energy
  }

  get position() {
    return this.props.position
  }

  get teamId() {
    return this.props.teamId
  }

  get kick() {
    return this.props.kick
  }

  get longKick() {
    return this.props.longKick
  }

  get pass() {
    return this.props.pass
  }

  get longPass() {
    return this.props.longPass
  }

  get jump() {
    return this.props.jump
  }

  get reflexes() {
    return this.props.reflexes
  }

  get isStar() {
    return this.props.isStar
  }
}
