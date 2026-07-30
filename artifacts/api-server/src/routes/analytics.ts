import { Router, type IRouter } from "express";
import { db, analyticsEventsTable } from "@workspace/db";
import {
  TrackEventBody,
  TrackEventResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/analytics/event", async (req, res): Promise<void> => {
  const parsed = TrackEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.insert(analyticsEventsTable).values({
    event: parsed.data.event,
    page: parsed.data.page,
    metadata: parsed.data.metadata ?? null,
    ip: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null,
  });

  res.json(TrackEventResponse.parse({ success: true }));
});

export default router;
