import { useParams } from "wouter";
import { useGetProject, getGetProjectQueryKey } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Activity, Target, Zap, LayoutList } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug || "";
  
  const { data: project, isLoading, error } = useGetProject(slug, { 
    query: { enabled: !!slug, queryKey: getGetProjectQueryKey(slug) } 
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-mono">Loading project data...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-32 min-h-[80vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Project not found or doesn't exist.</p>
        <Button variant="outline" asChild>
          <Link href="/#projects">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen">
      <Link href="/#projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors mb-10 group">
        <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to all projects
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.status && (
                <Badge variant="glass" className="bg-white/5">
                  {project.status}
                </Badge>
              )}
              {project.category && (
                <Badge variant="glass" className="bg-primary/20 text-primary border-primary/30">
                  {project.category}
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {project.longDescription || project.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <Button variant="outline" className="border-white/10" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Github className="w-4 h-4 mr-2" /> View Source
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="gradient" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Cover Image */}
          {project.coverImage && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img src={project.coverImage} alt={project.title} className="w-full h-auto object-cover" />
            </motion.div>
          )}

          {/* Details Content */}
          <div className="space-y-12 pt-8">
            {project.problemStatement && (
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="text-2xl font-bold flex items-center gap-3 mb-4">
                  <Target className="text-primary" /> The Problem
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.problemStatement}
                </p>
              </motion.section>
            )}

            {project.solution && (
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="text-2xl font-bold flex items-center gap-3 mb-4">
                  <Zap className="text-cyan-400" /> The Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </motion.section>
            )}

            {project.lessonsLearned && (
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="text-2xl font-bold flex items-center gap-3 mb-4">
                  <LayoutList className="text-purple-400" /> Lessons Learned
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.lessonsLearned}
                </p>
              </motion.section>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="sticky top-28 bg-[#111827] border border-white/5 rounded-2xl p-6 md:p-8 space-y-8"
          >
            <div>
              <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech: string) => (
                  <span key={tech} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-sm text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.metrics && (
              <div>
                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Key Metrics
                </h4>
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm leading-relaxed">
                  {project.metrics}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}