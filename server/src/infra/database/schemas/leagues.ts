import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from './users.ts'

export const leagues = pgTable(
  'leagues',
  {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    code: text().notNull().unique(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  },
  (table) => [index().on(table.code)],
)
