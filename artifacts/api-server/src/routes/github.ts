import { Router, type IRouter } from "express";
import {
  GetGithubProfileResponse,
  ListGithubReposResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

// Static GitHub data — in production you'd cache calls to the GitHub API
const GITHUB_PROFILE = {
  username: "aniketpaswan",
  bio: "Backend Engineer building scalable systems. B.Tech CSE | FastAPI | PostgreSQL | Docker",
  publicRepos: 18,
  followers: 42,
  following: 31,
  avatarUrl: "https://avatars.githubusercontent.com/u/aniketpaswan",
  htmlUrl: "https://github.com/aniketpaswan",
  totalStars: 87,
  totalCommits: 412,
  topLanguages: ["Python", "TypeScript", "SQL", "Bash"],
};

const GITHUB_REPOS = [
  {
    name: "api-security-platform",
    description: "A FastAPI middleware that protects APIs using behavioral analysis and adaptive risk scoring",
    url: "https://github.com/aniketpaswan/api-security-platform",
    stars: 34,
    forks: 7,
    language: "Python",
    topics: ["fastapi", "security", "redis", "postgresql"],
  },
  {
    name: "auth-system",
    description: "High-performance authentication system with JWT, Redis caching and role-based access control",
    url: "https://github.com/aniketpaswan/auth-system",
    stars: 28,
    forks: 5,
    language: "Python",
    topics: ["jwt", "redis", "fastapi", "postgresql"],
  },
  {
    name: "mental-health-chatbot",
    description: "An AI-powered mental health support chatbot fine-tuned using T5 model and built with modern web stack",
    url: "https://github.com/aniketpaswan/mental-health-chatbot",
    stars: 25,
    forks: 4,
    language: "TypeScript",
    topics: ["ai", "mongodb", "react", "tailwindcss"],
  },
];

router.get("/github/profile", async (_req, res): Promise<void> => {
  res.json(GetGithubProfileResponse.parse(GITHUB_PROFILE));
});

router.get("/github/repos", async (_req, res): Promise<void> => {
  res.json(ListGithubReposResponse.parse(GITHUB_REPOS));
});

export default router;
