import { useParams } from "wouter";
import { useGetBlog, getGetBlogQueryKey } from "@workspace/api-client-react";
import type { Blog } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function BlogDetail() {
  const params = useParams();
  const slug = params.slug || "";
  
  const { data: blog, isLoading, error } = useGetBlog(slug, { 
    query: { enabled: !!slug, queryKey: getGetBlogQueryKey(slug) } 
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-mono">Loading insight...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-32 min-h-[80vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Article not found.</p>
        <Button variant="outline" asChild>
          <Link href="/#blog">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-12 md:py-20 min-h-screen max-w-4xl">
      <Link href="/#blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors mb-12 group">
        <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to all articles
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {blog.createdAt ? format(new Date(blog.createdAt), 'MMMM d, yyyy') : 'Unknown'}
          </div>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {blog.readingTime || 5} min read
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-12">
          {blog.tags?.map((tag: string) => (
            <span key={tag} className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded border border-cyan-400/20">
              {tag}
            </span>
          ))}
        </div>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-12 border border-white/5">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-auto max-h-[500px] object-cover" />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
          {/* If there's real content, we render it. Since the prompt's API might return markdown, we should ideally parse it.
              For this setup, we'll just render the text as a placeholder or using dangerouslySetInnerHTML if it's HTML.
              Assuming content is simple text or HTML for now, or just render the summary if content is missing. */}
          {blog.content ? (
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          ) : (
            <p className="text-xl leading-relaxed text-gray-300">
              {blog.summary}
            </p>
          )}
        </div>
      </motion.div>
    </article>
  );
}