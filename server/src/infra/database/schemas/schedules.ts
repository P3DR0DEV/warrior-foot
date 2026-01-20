import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { leagues } from './leagues.ts'

export const division = pgEnum('division', ['A', 'B', 'C', 'D'])

export const schedules = pgTable("schedules", {
  id: uuid().primaryKey().defaultRandom(),
  leagueId: uuid('league_id').notNull().references(() => leagues.id),
  division: division().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})
