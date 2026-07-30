import { Router, type IRouter } from "express";
import { db, newsletterSubscribersTable } from "@workspace/db";
import {
  SubscribeNewsletterBody,
  SubscribeNewsletterResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/newsletter", async (req, res): Promise<void> => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  try {
    await db.insert(newsletterSubscribersTable).values({
      email: parsed.data.email,
      name: parsed.data.name ?? null,
    });
    res.json(SubscribeNewsletterResponse.parse({ success: true, message: "Successfully subscribed to newsletter!" }));
  } catch {
    // Duplicate email — already subscribed
    res.json(SubscribeNewsletterResponse.parse({ success: true, message: "You're already subscribed!" }));
  }
});

export default router;
