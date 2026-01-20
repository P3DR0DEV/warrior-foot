import { integer, pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core'
import { schedules } from './schedules.ts'
import { teams } from './teams.ts'

export const matches = pgTable('matches', {
  id: uuid().primaryKey().defaultRandom(),
  round: integer().notNull(),
  homeTeamId: uuid('home_team_id')
    .notNull()
    .references(() => teams.id),
  awayTeamId: uuid('away_team_id')
    .notNull()
    .references(() => teams.id),
  scheduleId: uuid('schedule_id')
    .notNull()
    .references(() => schedules.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
}, (table) => ({
  uniqueMatch: unique().on(table.homeTeamId, table.awayTeamId, table.scheduleId, table.round),
}))
