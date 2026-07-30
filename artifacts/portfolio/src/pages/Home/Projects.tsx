import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListFeaturedProjects, useListGithubRepos } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight, Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Projects() {
  const { data: projects = [], isLoading } = useListFeaturedProjects({ query: { enabled: true } });
  const { data: repos = [], isLoading: reposLoading } = useListGithubRepos({ query: { enabled: true } });

  return (
    <section id="projects" className="scroll-mt-24 space-y-24">
      {/* Featured Projects */}
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-cyan-400 mb-2">// FEATURED PROJECTS</div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Things I've <span className="gradient-text">Built &lt;/&gt;</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button variant="ghost" className="text-muted-foreground hover:text-white" asChild>
              <Link href="/projects">
                View all projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[320px] md:min-w-[400px] h-[450px] bg-[#111827] rounded-xl animate-pulse flex-shrink-0 snap-start border border-white/5" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} delay={idx * 0.1} />
            ))}
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {FALLBACK_PROJECTS.map((project, idx) => (
              <ProjectCard key={project.id} project={project as any} delay={idx * 0.1} />
            ))}
          </div>
        )}
      </div>

      {/* Open Source / Github Repos */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold">
            Open <span className="text-cyan-400">Source</span> Contributions
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reposLoading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-[#111827] rounded-xl animate-pulse border border-white/5" />
            ))
          ) : repos.length > 0 ? (
            repos.slice(0, 6).map((repo, idx) => (
              <RepoCard key={repo.name} repo={repo} delay={idx * 0.1} />
            ))
          ) : (
            FALLBACK_REPOS.map((repo, idx) => (
              <RepoCard key={repo.name} repo={repo as any} delay={idx * 0.1} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }: { project: any, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="min-w-[320px] md:min-w-[420px] max-w-[420px] flex-shrink-0 snap-start"
    >
      <Card className="h-full bg-card/60 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-colors group overflow-hidden flex flex-col">
        <div className="relative h-48 bg-[#0a0b0f] overflow-hidden">
          {project.coverImage ? (
            <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-105" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#111827] to-[#1a1f2e] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-50" />
              <h3 className="text-3xl font-black text-white/10 select-none px-4 text-center leading-none">{project.title}</h3>
            </div>
          )}
          <div className="absolute top-4 right-4 flex gap-2">
            {project.status === "Live" || project.status === "Completed" ? (
              <Badge variant="glass" className="bg-green-500/20 text-green-400 border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" /> Live
              </Badge>
            ) : (
              <Badge variant="glass" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1.5" /> In Progress
              </Badge>
            )}
          </div>
        </div>
        
        <CardContent className="p-6 flex-1 flex flex-col">
          <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies?.slice(0, 4).map((tech: string) => (
              <span key={tech} className="text-xs font-mono text-cyan-400/80 bg-cyan-400/10 px-2 py-1 rounded border border-cyan-400/20">
                {tech}
              </span>
            ))}
            {project.technologies?.length > 4 && (
              <span className="text-xs font-mono text-muted-foreground px-2 py-1 rounded bg-white/5 border border-white/5">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm text-muted-foreground hover:text-white transition-colors">
                <Github className="w-4 h-4 mr-1.5" /> Code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm text-muted-foreground hover:text-cyan-400 transition-colors ml-auto">
                <ExternalLink className="w-4 h-4 mr-1.5" /> Live Demo
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RepoCard({ repo, delay }: { repo: any, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <a href={repo.url} target="_blank" rel="noreferrer" className="block h-full">
        <Card className="h-full bg-[#111827] hover:bg-[#1a1f2e] border-white/5 hover:border-white/20 transition-all">
          <CardContent className="p-5 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <Github className="w-5 h-5" />
              <h4 className="font-semibold text-white truncate">{repo.name}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
              {repo.description || "No description provided."}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-white/5">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                  <Star className="w-3.5 h-3.5" /> {repo.stars}
                </span>
                {repo.forks !== undefined && (
                  <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <GitFork className="w-3.5 h-3.5" /> {repo.forks}
                  </span>
                )}
              </div>
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {repo.language}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
}

const FALLBACK_PROJECTS = [
  {
    id: 1,
    slug: "api-security-platform",
    title: "API Security Platform",
    description: "A robust middleware platform analyzing traffic to detect anomalies and block malicious requests in real-time.",
    technologies: ["Python", "FastAPI", "Redis", "Docker"],
    status: "Live",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 2,
    slug: "authentication-system",
    title: "Authentication System",
    description: "Scalable OAuth2 and JWT-based authentication service built for microservices architecture with rate limiting.",
    technologies: ["Node.js", "Express", "PostgreSQL", "JWT"],
    status: "Completed",
    githubUrl: "#"
  },
  {
    id: 3,
    slug: "mental-health-chatbot",
    title: "Mental Health Chatbot",
    description: "AI-powered conversational agent providing mental health support using NLP and sentiment analysis.",
    technologies: ["Python", "TensorFlow", "MongoDB", "React"],
    status: "In Progress",
    githubUrl: "#"
  }
];

const FALLBACK_REPOS = [
  { name: "fastapi-microservice", description: "Template for building scalable microservices with FastAPI", url: "#", stars: 124, forks: 45, language: "Python" },
  { name: "redis-cache-manager", description: "A simple wrapper around redis-py for efficient caching", url: "#", stars: 89, forks: 12, language: "Python" },
  { name: "docker-nginx-proxy", description: "Dockerized reverse proxy configuration for Node apps", url: "#", stars: 56, forks: 8, language: "Shell" },
];