import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { leagues } from './leagues.ts'
import { users } from './users.ts'

export const roleEnum = pgEnum('role', ['owner', 'guest'])

export const leagueUsers = pgTable('league_users', {
  id: uuid().primaryKey().defaultRandom(),
  leagueId: uuid('league_id')
    .notNull()
    .references(() => leagues.id),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  role: roleEnum().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})
