import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, blogsTable } from "@workspace/db";
import {
  ListBlogsResponse,
  GetBlogResponse,
  GetBlogParams,
} from "@workspace/api-zod";
import { serializeDates } from "../lib/serialize";

const router: IRouter = Router();

router.get("/blogs", async (_req, res): Promise<void> => {
  const blogs = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.published, true))
    .orderBy(desc(blogsTable.createdAt));
  res.json(ListBlogsResponse.parse(serializeDates(blogs)));
});

router.get("/blogs/:slug", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.slug)
    ? req.params.slug[0]
    : req.params.slug;
  const params = GetBlogParams.safeParse({ slug: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [blog] = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.slug, params.data.slug));

  if (!blog) {
    res.status(404).json({ error: "Blog not found" });
    return;
  }

  res.json(GetBlogResponse.parse(serializeDates(blog)));
});

export default router;
