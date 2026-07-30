import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import blogsRouter from "./blogs";
import contactRouter from "./contact";
import resumeRouter from "./resume";
import githubRouter from "./github";
import searchRouter from "./search";
import newsletterRouter from "./newsletter";
import analyticsRouter from "./analytics";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectsRouter);
router.use(blogsRouter);
router.use(contactRouter);
router.use(resumeRouter);
router.use(githubRouter);
router.use(searchRouter);
router.use(newsletterRouter);
router.use(analyticsRouter);

export default router;
