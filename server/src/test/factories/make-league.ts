import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { League, type LeagueProps } from '#domain/warrior-foot/enterprise/entities/league.ts'

export function makeLeague(override: Partial<LeagueProps> = {}, id?: UniqueEntityId) {
  const league = League.create(
    {
      name: faker.company.name(),
      code: faker.string.nanoid(),
      userId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return league
}
