// src/app/lib/schema.js

import {
  uniqueIndex,
  timestamp,
  text,
  pgTable,
  serial,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const linksTable = pgTable(
  "links",
  {
    id: serial("id").primaryKey().notNull(),
    url: text("url").notNull(),
    short: varchar("short", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (links) => [uniqueIndex("url_idx").on(links.url)]
);

// links --> link --> has as many visits as it has been visited
export const linksTableRelations = relations(linksTable, ({ many }) => ({
  visits: many(visitsTable),
}));

export const visitsTable = pgTable("visits", {
  id: serial("id").primaryKey().notNull(),
  linkId: integer("link_id")
    .notNull()
    .references(() => linksTable.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// visits --> visit --> one link
export const visitsTableRelations = relations(visitsTable, ({ one }) => ({
  link: one(linksTable, {
    fields: [visitsTable.linkId],
    references: [linksTable.id],
  }),
}));
