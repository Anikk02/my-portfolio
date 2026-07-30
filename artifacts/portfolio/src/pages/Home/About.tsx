import { motion } from "framer-motion";
import { Terminal, Database, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetGithubProfile } from "@workspace/api-client-react";

export function About() {
  const { data: githubProfile } = useGetGithubProfile({ query: { enabled: true } });

  return (
    <section id="about" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="font-mono text-cyan-400 mb-2">// ABOUT ME</div>
        <h2 className="text-3xl md:text-4xl font-bold">
          Crafting <span className="gradient-text">Solutions</span> with Code
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-8 flex flex-col gap-6"
        >
          <div className="text-muted-foreground text-lg leading-relaxed space-y-4">
            <p>
              I am a Backend Engineer deeply passionate about system design, microservices, and crafting scalable infrastructure. What started as writing simple scripts has evolved into a career of building systems that handle high traffic with grace.
            </p>
            <p>
              My expertise lies in architecting APIs, optimizing databases, and deploying containerized applications. I believe that good backend code should be invisible to the user but bulletproof for the business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Trait icon={<Shield />} title="Problem Solver" desc="Tackling complex architectural challenges" />
            <Trait icon={<Terminal />} title="Clean Code Advocate" desc="Writing maintainable & testable code" />
            <Trait icon={<Database />} title="System Design Enthusiast" desc="Architecting for scale and resilience" />
            <Trait icon={<Zap />} title="Always Learning" desc="Adapting to new technologies rapidly" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4"
        >
          <Card className="glass-card overflow-hidden group">
            <CardContent className="p-0">
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-50" />
                {githubProfile?.avatarUrl ? (
                  <img src={githubProfile.avatarUrl} alt="Aniket Paswan" className="w-32 h-32 rounded-full border-4 border-[#111827] object-cover relative z-10 shadow-xl" />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-[#111827] bg-[#1a1f2e] flex items-center justify-center text-4xl font-bold text-white relative z-10 shadow-xl">
                    AP
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <StatRow label="Location" value="India" />
                <StatRow label="Education" value="B.Tech CSE" />
                <StatRow label="Experience" value="Intern / Builder" />
                <StatRow label="Availability" value="Open to Work" highlight />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Trait({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
      <div className="text-primary mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function StatRow({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className={`text-sm font-medium ${highlight ? "text-cyan-400" : "text-white"}`}>{value}</span>
    </div>
  );
}