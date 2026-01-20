import { Entity } from "#core/entities/entity.ts";
import type { UniqueEntityId } from "#core/entities/unique-entity-id.ts";
import type { Optional } from "#core/types/optional.ts";

export type Division = 'A' | 'B' | 'C' | 'D'

export interface ScheduleProps {
  leagueId: UniqueEntityId;
  division: Division;
  createdAt: Date;
}

export class Schedule extends Entity<ScheduleProps> {
  static create(props: Optional<ScheduleProps, "createdAt">, id?: UniqueEntityId): Schedule {
    const schedule = new Schedule(
      {
        createdAt: props.createdAt ?? new Date(),
        ...props,
      },
      id,
    );
    return schedule;
  }

  get leagueId() {
    return this.props.leagueId;
  }

  get division() {
    return this.props.division;
  }
}