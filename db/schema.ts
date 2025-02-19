// import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// export const userTable = sqliteTable("user", {
//   // id: integer("id").notNull().primaryKey({ autoIncrement: true }),
//   id: text("id").notNull().primaryKey(),
//   username: text("username").notNull().unique(),
//   password_hash: text("password_hash").notNull(),
//   // notificationsCount: integer("notifications_count").notNull().default(0),
// });

// export const sessionTable = sqliteTable("session", {
//   id: text("id").notNull().primaryKey(),
//   userId: text("user_id")
//     .notNull()
//     .references(() => userTable.id),
//   expiresAt: integer("expires_at").notNull(),
// });

// export type InsertUser = typeof userTable.$inferInsert;
// export type SelectUser = typeof userTable.$inferSelect;

// export type InsertSession = typeof sessionTable.$inferInsert;
// export type SelectSession = typeof sessionTable.$inferSelect;

import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import pg from "pg";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new pg.Pool();
const db = drizzle(pool);

export const userTable = pgTable("user", {
  // id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  notifications_count: integer("notifications_count").notNull().default(0),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const urlTable = pgTable("url", {
  // id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  url: text("url").notNull().unique().primaryKey(),
  listingUrls: text("listingUrls").notNull(),
  lastScraped: timestamp("lastScraped", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
