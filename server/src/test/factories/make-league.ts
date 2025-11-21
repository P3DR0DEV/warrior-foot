import { faker } from '@faker-js/faker'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { League, type LeagueProps } from '#domain/warrior-foot/enterprise/entities/league.ts'
import { DrizzleLeaguesMapper } from '#infra/database/drizzle/mappers/drizzle-leagues-mapper.ts'
import { leagues } from '#infra/database/schemas/leagues.ts'

export function makeLeague(override: Partial<LeagueProps> = {}, id?: UniqueEntityId) {
  const league = League.create(
    {
      name: faker.company.name(),
      userId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return league
}

export class LeagueFactory {
  constructor(private drizzle: NodePgDatabase) {}

  async createLeague(data: Partial<LeagueProps> = {}) {
    const league = makeLeague(data)

    await this.drizzle.insert(leagues).values(DrizzleLeaguesMapper.toPersistence(league))

    return league
  }
}
