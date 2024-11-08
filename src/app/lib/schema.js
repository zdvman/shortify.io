// src/app/lib/schema.js

import {
  uniqueIndex,
  timestamp,
  text,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

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
