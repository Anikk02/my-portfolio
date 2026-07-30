import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, resumeVersionsTable } from "@workspace/db";
import { GetLatestResumeResponse } from "@workspace/api-zod";
import { serializeDates } from "../lib/serialize";

const router: IRouter = Router();

router.get("/resume/latest", async (_req, res): Promise<void> => {
  const [resume] = await db
    .select()
    .from(resumeVersionsTable)
    .where(eq(resumeVersionsTable.active, true))
    .orderBy(desc(resumeVersionsTable.createdAt))
    .limit(1);

  if (!resume) {
    res.status(404).json({ error: "No resume available" });
    return;
  }

  res.json(GetLatestResumeResponse.parse(serializeDates(resume)));
});

export default router;
