import { pgTable, serial, timestamp, varchar, text } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  telefon: varchar("telefon", { length: 255 }),
  verwaltungstyp: varchar("verwaltungstyp", { length: 100 }),
  einheiten: varchar("einheiten", { length: 100 }),
  standort: varchar("standort", { length: 100 }),
  situation: varchar("situation", { length: 100 }),
  prioritaet: varchar("prioritaet", { length: 100 }),
  quelle: varchar("quelle", { length: 50 }).notNull(), // 'anfrage' | 'kontakt'
  notizen: text("notizen"),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
