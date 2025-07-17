import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  username: text().notNull().unique(),
  password: text().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: text().notNull().unique(),
  photoUrl: text(),
});
