import { Link, useLocation } from "wouter";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { getGlobalSearchQueryKey, useGlobalSearch } from "@workspace/api-client-react";
import type { Blog, Project } from "@workspace/api-client-react";
import { useDebounce } from "@/hooks/use-debounce";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Blog", href: "/#blog" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const [location, setLocation] = useLocation();

  const { data: searchResults, isFetching } = useGlobalSearch(
    { q: debouncedQuery },
    {
      query: {
        enabled: debouncedQuery.length > 1,
        queryKey: getGlobalSearchQueryKey({ q: debouncedQuery }),
      },
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setSearchOpen(false);
    
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (location !== "/") {
        setLocation("/");
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setLocation(href);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold font-mono text-white tracking-tighter">
            Aniket<span className="text-primary">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors border border-white/5"
              >
                <Search size={16} />
              </button>
              <Button variant="gradient" size="sm" onClick={() => handleNavClick("/#contact")}>
                Let's Talk
              </Button>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-muted-foreground"
            >
              <Search size={20} />
            </button>
            <button className="text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/5 p-4 shadow-2xl"
            >
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="block w-full text-left text-lg font-medium text-muted-foreground hover:text-white transition-colors py-2 px-4 rounded-md hover:bg-white/5"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
                <li>
                  <Button variant="gradient" className="w-full mt-4" onClick={() => handleNavClick("/#contact")}>
                    Let's Talk
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          >
            <div className="absolute inset-0" onClick={() => setSearchOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-[#111827] border border-white/10 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col"
            >
              <div className="flex items-center border-b border-white/10 px-4 py-4">
                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search projects, blogs, skills..."
                  className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-muted-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {debouncedQuery.length < 2 ? (
                  <div className="p-8 text-center text-muted-foreground text-sm">
                    Start typing to search...
                  </div>
                ) : isFetching ? (
                  <div className="p-8 flex justify-center text-primary">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : searchResults ? (
                  <div className="flex flex-col gap-1 p-2">
                    {/* Projects */}
                    {searchResults.projects?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">Projects</h4>
                        {searchResults.projects.map((p: Project) => (
                          <button
                            key={p.id}
                            onClick={() => handleNavClick(`/projects/${p.slug}`)}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 transition-colors flex flex-col"
                          >
                            <span className="font-medium text-white">{p.title}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1">{p.description}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Blogs */}
                    {searchResults.blogs?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">Articles</h4>
                        {searchResults.blogs.map((b: Blog) => (
                          <button
                            key={b.id}
                            onClick={() => handleNavClick(`/blog/${b.slug}`)}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 transition-colors flex flex-col"
                          >
                            <span className="font-medium text-white">{b.title}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1">{b.summary}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Skills */}
                    {searchResults.skills?.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">Skills Found</h4>
                        <div className="flex flex-wrap gap-2 px-2 pb-4">
                          {searchResults.skills.map((s: string) => (
                            <span key={s} className="bg-primary/20 text-primary border border-primary/30 px-2 py-1 rounded text-xs font-mono">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {(!searchResults.projects?.length && !searchResults.blogs?.length && !searchResults.skills?.length) && (
                      <div className="p-8 text-center text-muted-foreground text-sm">
                        No results found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}