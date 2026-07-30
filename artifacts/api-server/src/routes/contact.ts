import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import {
  SubmitContactBody,
  SubmitContactResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.insert(contactsTable).values({
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company ?? null,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });

  res.json(SubmitContactResponse.parse({ success: true, message: "Message sent successfully! I'll get back to you soon." }));
});

export default router;
