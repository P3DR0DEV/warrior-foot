import { Entity } from "#core/entities/entity.ts"
import type { UniqueEntityId } from "#core/entities/unique-entity-id.ts"
import type { Optional } from "#core/types/optional.ts"

export interface LeagueProps {
  name: string
  code: string
  userId: UniqueEntityId
  createdAt: Date
}

export class League extends Entity<LeagueProps> {
  static create(props: Optional<LeagueProps, 'createdAt'>, id?: UniqueEntityId): League {
    const league = new League(
      {
        createdAt: props.createdAt ?? new Date(),
        ...props,
      },
      id,
    )
    return league
  }

  get name () {
    return this.props.name
  }

  get code () {
    return this.props.code
  }

  get userId () {
    return this.props.userId
  }
}