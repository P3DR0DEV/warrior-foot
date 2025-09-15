import { Entity } from '#core/entities/entity.ts'
import type { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import type { Optional } from '#core/types/optional.ts'

type LeagueUsersRole = 'owner' | 'guest'

export interface LeagueUserProps {
  leagueId: UniqueEntityId
  userId: UniqueEntityId
  role: LeagueUsersRole
  createdAt: Date
}

export class LeagueUsers extends Entity<LeagueUserProps> {
  static create(props: Optional<LeagueUserProps, 'createdAt'>, id?: UniqueEntityId): LeagueUsers {
    const leagueUser = new LeagueUsers(
      {
        createdAt: props.createdAt ?? new Date(),
        ...props,
      },
      id,
    )
    return leagueUser
  }

  get leagueId() {
    return this.props.leagueId
  }

  get userId() {
    return this.props.userId
  }

  get role() {
    return this.props.role
  }
}
