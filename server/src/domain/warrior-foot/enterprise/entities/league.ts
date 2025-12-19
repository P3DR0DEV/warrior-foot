import { Entity } from '#core/entities/entity.ts'
import type { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import type { Optional } from '#core/types/optional.ts'
import { Code } from '../value-objects/code.ts'

export interface LeagueProps {
  name: string
  code: Code
  userId: UniqueEntityId
  createdAt: Date
}

export class League extends Entity<LeagueProps> {
  static create(props: Optional<LeagueProps, 'createdAt' | 'code' | 'name'>, id?: UniqueEntityId): League {
    const league = new League(
      {
        createdAt: props.createdAt ?? new Date(),
        code: Code.create(),
        name: props.name ?? new Date().toISOString(),
        ...props,
      },
      id,
    )
    return league
  }

  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
  }

  get code() {
    return this.props.code.toValue()
  }

  get userId() {
    return this.props.userId
  }
}
