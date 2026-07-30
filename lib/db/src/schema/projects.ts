import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const projectsTable = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  coverImage: text("cover_image"),
  technologies: text("technologies").array().notNull().default([]),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  featured: boolean("featured").notNull().default(false),
  order: integer("order").notNull().default(0),
  status: text("status").notNull().default("completed"),
  category: text("category"),
  metrics: text("metrics"),
  problemStatement: text("problem_statement"),
  solution: text("solution"),
  lessonsLearned: text("lessons_learned"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projectsTable).omit({ id: true, createdAt: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projectsTable.$inferSelect;
