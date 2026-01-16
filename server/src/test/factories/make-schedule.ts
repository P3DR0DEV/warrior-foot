import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { Schedule, type ScheduleProps } from '#domain/warrior-foot/enterprise/entities/schedule.ts'

export function makeSchedule(override: Partial<ScheduleProps> = {}, id?: UniqueEntityId) {
  const schedule = Schedule.create(
    {
      leagueId: new UniqueEntityId(),
      division: faker.helpers.arrayElement(['A', 'B', 'C', 'D']),
      ...override,
    },
    id,
  )

  return schedule
}
