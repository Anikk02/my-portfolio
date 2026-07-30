import { Router, type IRouter } from "express";
import { ilike, or } from "drizzle-orm";
import { db, projectsTable, blogsTable } from "@workspace/db";
import { GlobalSearchResponse, GlobalSearchQueryParams } from "@workspace/api-zod";
import { serializeDates } from "../lib/serialize";

const SKILLS = [
  "Python", "FastAPI", "Node.js", "Express", "TypeScript", "JavaScript",
  "PostgreSQL", "Redis", "MongoDB", "Docker", "Linux", "Git", "AWS",
  "React", "HTML", "CSS", "Tailwind CSS", "SQLAlchemy", "Drizzle ORM",
];

const router: IRouter = Router();

router.get("/search", async (req, res): Promise<void> => {
  const params = GlobalSearchQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: "Query param 'q' is required" });
    return;
  }

  const q = params.data.q.toLowerCase().trim();
  if (!q) {
    res.json(GlobalSearchResponse.parse({ projects: [], blogs: [], skills: [] }));
    return;
  }

  const [projects, blogs] = await Promise.all([
    db
      .select()
      .from(projectsTable)
      .where(
        or(
          ilike(projectsTable.title, `%${q}%`),
          ilike(projectsTable.description, `%${q}%`),
        ),
      )
      .limit(5),
    db
      .select()
      .from(blogsTable)
      .where(
        or(
          ilike(blogsTable.title, `%${q}%`),
          ilike(blogsTable.summary, `%${q}%`),
        ),
      )
      .limit(5),
  ]);

  const matchedSkills = SKILLS.filter((s) => s.toLowerCase().includes(q));

  res.json(GlobalSearchResponse.parse(serializeDates({ projects, blogs, skills: matchedSkills })));
});

export default router;
