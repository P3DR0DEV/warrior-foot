import { Entity } from '#core/entities/entity.ts'
import type { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import type { Optional } from '#core/types/optional.ts'

interface MatchProps {
  scheduleId: UniqueEntityId
  round: number
  homeTeamId: UniqueEntityId
  awayTeamId: UniqueEntityId

  createdAt: Date
}

export class Match extends Entity<MatchProps> {
  static create(props: Optional<MatchProps, "createdAt">, id?: UniqueEntityId): Match {
    const match = new Match(
      {
        createdAt: props.createdAt ?? new Date(),
        ...props,
      },
      id,
    );
    return match;
  }

  get scheduleId() {
    return this.props.scheduleId;
  }

  get round() {
    return this.props.round;
  }

  get home() {
    return this.props.homeTeamId;
  }

  get away() {
    return this.props.awayTeamId;
  }
}
