import { Entity } from "#core/entities/entity.ts"
import type { UniqueEntityId } from "#core/entities/unique-entity-id.ts"
import type { Optional } from "#core/types/optional.ts"
import type { PlayerProps } from "./player.ts"

export interface GoalkeeperProps extends PlayerProps {
  position: 'goalkeeper'
  jump: number
  reflexes: number
}

export class Goalkeeper extends Entity<GoalkeeperProps> {
  static create(
    props: Optional<GoalkeeperProps, 'createdAt'>,
    id?: UniqueEntityId
  ): Goalkeeper {
    const player = new Goalkeeper(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )
    return player
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
}
