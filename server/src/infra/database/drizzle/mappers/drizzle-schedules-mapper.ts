import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { Schedule } from '#domain/warrior-foot/enterprise/entities/schedule.ts'

type RawValue = {
  id: string
  leagueId: string
  division: 'A' | 'B' | 'C' | 'D'
  createdAt: Date
}

export class DrizzleSchedulesMapper {
  static toDomain(raw: RawValue): Schedule {
    return Schedule.create(
      {
        leagueId: new UniqueEntityId(raw.leagueId),
        division: raw.division,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(schedule: Schedule) {
    return {
      id: schedule.id.toValue(),
      leagueId: schedule.leagueId.toValue(),
      division: schedule.division,
    }
  }
}
