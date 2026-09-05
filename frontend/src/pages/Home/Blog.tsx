import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  getListBlogsQueryKey,
  useListBlogs,
} from "@workspace/api-client-react";
import type { Blog } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { normalizeList } from "@/lib/normalize-list";

export function Blog() {
  const { data: blogs = [], isLoading } = useListBlogs({
    query: { enabled: true, queryKey: getListBlogsQueryKey() },
  });
  const blogList = normalizeList<Blog>(blogs, "blogs");

  return (
    <section id="blog" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="font-mono text-cyan-400 mb-2">// BLOG</div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Thoughts & <span className="gradient-text">Insights</span>
          </h2>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-80 bg-[#111827] rounded-xl animate-pulse border border-white/5" />
          ))}
        </div>
      ) : blogList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogList.slice(0, 3).map((blog, idx) => (
            <BlogCard key={blog.id} blog={blog} delay={idx * 0.1} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FALLBACK_BLOGS.map((blog, idx) => (
            <BlogCard key={blog.id} blog={blog as any} delay={idx * 0.1} />
          ))}
        </div>
      )}
    </section>
  );
}

function BlogCard({ blog, delay }: { blog: any, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <Link href={`/blog/${blog.slug}`}>
        <Card className="h-full bg-card/60 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-colors group cursor-pointer overflow-hidden flex flex-col">
          {blog.coverImage && (
            <div className="h-48 overflow-hidden relative">
              <img 
                src={blog.coverImage} 
                alt={blog.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>
          )}
          
          <CardContent className={`p-6 flex-1 flex flex-col ${!blog.coverImage ? "pt-8" : ""}`}>
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags?.slice(0, 2).map((tag: string) => (
                <span key={tag} className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                  {tag}
                </span>
              ))}
            </div>
            
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {blog.title}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-3">
              {blog.summary}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-white/5 mt-auto">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {blog.createdAt ? format(new Date(blog.createdAt), 'MMM d, yyyy') : 'Unknown'}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {blog.readingTime || 5} min read
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

const FALLBACK_BLOGS = [
  {
    id: 1,
    slug: "designing-scalable-apis",
    title: "Designing Scalable APIs with FastAPI and Redis",
    summary: "Learn how to build high-performance APIs that can handle thousands of concurrent requests using Python's fastest web framework and Redis caching.",
    tags: ["Backend", "Python", "System Design"],
    readingTime: 8,
    createdAt: "2023-10-15T10:00:00Z"
  },
  {
    id: 2,
    slug: "database-indexing-strategies",
    title: "Database Indexing: Beyond the Basics",
    summary: "A deep dive into PostgreSQL indexing strategies, covering B-Trees, Hash indexes, and when to use partial or composite indexes for maximum query performance.",
    tags: ["Database", "SQL", "Performance"],
    readingTime: 12,
    createdAt: "2023-09-22T10:00:00Z"
  },
  {
    id: 3,
    slug: "docker-for-backend-devs",
    title: "Containerization Patterns for Backend Developers",
    summary: "Best practices for writing Dockerfiles, managing multi-stage builds, and orchestrating microservices with docker-compose.",
    tags: ["DevOps", "Docker", "Architecture"],
    readingTime: 6,
    createdAt: "2023-08-05T10:00:00Z"
  }
];