import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, projectsTable } from "@workspace/db";
import {
  ListProjectsResponse,
  ListFeaturedProjectsResponse,
  GetProjectResponse,
  GetProjectParams,
} from "@workspace/api-zod";
import { serializeDates } from "../lib/serialize";

const router: IRouter = Router();

router.get("/projects", async (_req, res): Promise<void> => {
  const projects = await db
    .select()
    .from(projectsTable)
    .orderBy(asc(projectsTable.order));
  res.json(ListProjectsResponse.parse(serializeDates(projects)));
});

router.get("/projects/featured", async (_req, res): Promise<void> => {
  const projects = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.featured, true))
    .orderBy(asc(projectsTable.order));
  res.json(ListFeaturedProjectsResponse.parse(serializeDates(projects)));
});

router.get("/projects/:slug", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.slug)
    ? req.params.slug[0]
    : req.params.slug;
  const params = GetProjectParams.safeParse({ slug: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [project] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.slug, params.data.slug));

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json(GetProjectResponse.parse(serializeDates(project)));
});

export default router;
