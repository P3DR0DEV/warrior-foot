import { Entity } from '#core/entities/entity.ts'
import type { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import type { Optional } from '#core/types/optional.ts'

type Division = 'A' | 'B' | 'C' | 'D'

export interface TeamProps {
  name: string
  primaryColor: string
  secondaryColor: string
  division: Division
  leagueId: UniqueEntityId
  createdAt: Date
}

export class Team extends Entity<TeamProps> {
  static create(props: Optional<TeamProps, 'createdAt'>, id?: UniqueEntityId): Team {
    const team = new Team(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return team
  }

  get name() {
    return this.props.name
  }

  get primaryColor() {
    return this.props.primaryColor
  }

  get secondaryColor() {
    return this.props.secondaryColor
  }

  get division() {
    return this.props.division
  }

  get leagueId() {
    return this.props.leagueId
  }
}
