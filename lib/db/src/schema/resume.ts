import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const resumeVersionsTable = pgTable("resume_versions", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  version: text("version").notNull(),
  downloadUrl: text("download_url").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertResumeSchema = createInsertSchema(resumeVersionsTable).omit({ id: true, createdAt: true });
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumeVersionsTable.$inferSelect;
