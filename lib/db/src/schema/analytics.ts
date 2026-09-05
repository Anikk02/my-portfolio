import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const analyticsEventsTable = pgTable("analytics_events", {
  id: serial("id").primaryKey(),
  event: text("event").notNull(),
  page: text("page").notNull(),
  metadata: jsonb("metadata"),
  ip: text("ip"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertAnalyticsSchema = createInsertSchema(analyticsEventsTable).omit({ id: true, createdAt: true });
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type AnalyticsEvent = typeof analyticsEventsTable.$inferSelect;
