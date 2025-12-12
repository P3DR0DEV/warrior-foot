import { boolean, integer, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { teams } from './teams.ts'

export const positionEnum = pgEnum('position', ['goalkeeper', 'outfield'])

export const players = pgTable(
  'players',
  {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    teamId: uuid('team_id').notNull().references(() => teams.id),
    position: positionEnum().notNull(),
    isStar: boolean('is_star').notNull(),
    strength: integer().notNull(),
    agility: integer().notNull(),
    energy: integer().notNull(),
    kick: integer().notNull(),
    longKick: integer('long_kick').notNull(),
    pass: integer().notNull(),
    longPass: integer('long_pass').notNull(),
    dribble: integer(),
    jump: integer(),
    reflexes: integer(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
  }
)
