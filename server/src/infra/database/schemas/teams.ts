import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { leagues } from './leagues.ts'

export const divisionEnum = pgEnum('division', ['A', 'B', 'C', 'D'])

export const teams = pgTable('teams', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  primaryColor: text('primary_color').notNull(),
  secondaryColor: text('secondary_color').notNull(),
  division: divisionEnum().notNull().default('D'),
  leagueId: uuid('league_id')
    .notNull()
    .references(() => leagues.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})
