import { TransactionType } from "@/lib/types";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});
export type Users = typeof users.$inferSelect;

export const usersRelations = relations(users, ({ many }) => ({
  savings: many(savings),
  transactions: many(transactions),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const savings = pgTable("savings", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 255 }).notNull(),
});

export type Savings = typeof savings.$inferSelect;
export type NewSavings = typeof savings.$inferInsert;

export const savingsRelations = relations(savings, ({ many, one }) => ({
  transactions: many(transactions),
  userId: one(users, {
    fields: [savings.userId],
    references: [users.id],
  }),
}));

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  savingsId: integer("savings_id")
    .notNull()
    .references(() => savings.id, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  type: varchar("type", { length: 3 }).$type<TransactionType>().notNull(),
  date: timestamp("date", { withTimezone: true, mode: "date" }).defaultNow(),
});

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;

export const transactionsRelations = relations(transactions, ({ one }) => ({
  userId: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  savingsId: one(savings, {
    fields: [transactions.savingsId],
    references: [savings.id],
  }),
}));
