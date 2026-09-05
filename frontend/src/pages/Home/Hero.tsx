import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Play, Github, Linkedin, Code2 } from "lucide-react";
import { SiPython, SiPostgresql, SiRedis, SiFastapi, SiDocker } from "react-icons/si";
import {
  getGetLatestResumeQueryKey,
  useGetLatestResume,
} from "@workspace/api-client-react";

export function Hero() {
  const { data: resume } = useGetLatestResume({
    query: { enabled: true, queryKey: getGetLatestResumeQueryKey() },
  });
  const resumeUrl = resume?.downloadUrl
    ? getBasePathUrl(resume.downloadUrl)
    : `${import.meta.env.BASE_URL}Aniket__Paswan.pdf`;

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left Side: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-8 bg-cyan-400"></span>
            <span className="text-cyan-400 font-mono text-sm tracking-wider uppercase">Hello, I'm</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4"
          >
            <span className="gradient-text">Aniket Paswan</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 mb-6 flex items-center flex-wrap gap-2"
          >
            Backend Engineer <span className="text-white/20">|</span> <span className="text-muted-foreground font-normal">Secure, High-Performance APIs</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
          >
            Computer Science undergraduate focused on backend development, REST API design, API security, and authentication systems. I build secure, modular, and high-performance software with Python and FastAPI.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <Button size="lg" variant="gradient" className="font-semibold px-8" asChild>
              <a href="#projects">View My Work &rarr;</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5" asChild>
              <a href={resumeUrl} target="_blank" rel="noreferrer">
                <Download className="w-4 h-4 mr-2" /> Resume
              </a>
            </Button>
            <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-white">
              <Play className="w-4 h-4 mr-2" /> Intro
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex items-center gap-5"
          >
            <a href="https://github.com/Anikk02" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors hover:scale-110 transform">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/anikk08" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform">
              <Linkedin size={24} />
            </a>
            <a href="https://leetcode.com/u/Gwishin" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-cyan-400 transition-colors hover:scale-110 transform">
              <Code2 size={24} />
            </a>
          </motion.div>
        </div>

        {/* Right Side: 3D Server Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-0 h-[400px] sm:h-[500px]"
        >
          <div className="relative w-full max-w-[400px] h-full flex items-center justify-center isometric-rack">
            
            {/* Base glowing pad */}
            <div className="absolute bottom-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl transform rotate-x-60" />

            {/* Server Rack Layers */}
            <div className="relative w-64 h-80 flex flex-col gap-4 preserve-3d">
              {[1, 2, 3, 4].map((layer, i) => (
                <motion.div 
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: i * 0.5, ease: "easeInOut" }}
                  className="w-full h-16 bg-[#111827] border border-primary/30 rounded-lg relative overflow-hidden group shadow-[0_0_15px_rgba(124,58,237,0.1)]"
                  style={{ transform: `translateZ(${i * 20}px)` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                  <div className="flex items-center justify-between px-4 h-full">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <div className="flex gap-1 flex-1 px-4">
                      {Array.from({ length: 12 }).map((_, j) => (
                        <div key={j} className="h-4 w-1 bg-primary/20 rounded-sm overflow-hidden">
                          <motion.div 
                            animate={{ height: ['0%', '100%', '0%'] }}
                            transition={{ repeat: Infinity, duration: 1 + Math.random(), delay: Math.random() * 2 }}
                            className="w-full bg-cyan-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Tech Badges */}
            <FloatingBadge icon={<SiPython className="text-[#3776AB]" />} delay={0} className="-left-10 top-10" />
            <FloatingBadge icon={<SiPostgresql className="text-[#336791]" />} delay={1} className="right-0 top-0" />
            <FloatingBadge icon={<SiDocker className="text-[#2496ED]" />} delay={2} className="-right-10 bottom-32" />
            <FloatingBadge icon={<SiRedis className="text-[#DC382D]" />} delay={1.5} className="-left-4 bottom-20" />
            <FloatingBadge icon={<SiFastapi className="text-[#009688]" />} delay={0.5} className="left-1/2 -top-10" />

          </div>
        </motion.div>

      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="font-mono text-xs uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}

function getBasePathUrl(url: string) {
  if (!url.startsWith("/")) return url;
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${basePath}${url}`;
}

function FloatingBadge({ icon, delay, className }: { icon: React.ReactNode, delay: number, className: string }) {
  return (
    <motion.div
      animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
      transition={{ repeat: Infinity, duration: 5, delay, ease: "easeInOut" }}
      className={`absolute w-12 h-12 rounded-xl bg-[#0d1117]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-2xl shadow-xl shadow-black/50 z-20 ${className}`}
    >
      {icon}
    </motion.div>
  );
}