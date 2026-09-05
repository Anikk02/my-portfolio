import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogsTable = pgTable("blogs", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content"),
  coverImage: text("cover_image"),
  tags: text("tags").array().notNull().default([]),
  published: boolean("published").notNull().default(false),
  readingTime: integer("reading_time"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertBlogSchema = createInsertSchema(blogsTable).omit({ id: true, createdAt: true });
export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type Blog = typeof blogsTable.$inferSelect;
