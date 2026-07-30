import { motion } from "framer-motion";
import { 
  SiPython, SiFastapi, SiNodedotjs, SiExpress, 
  SiPostgresql, SiRedis, SiMongodb, 
  SiDocker, SiLinux, SiGit,
  SiReact, SiTypescript, SiHtml5, SiCss3
} from "react-icons/si";

const SKILL_CATEGORIES = [
  {
    name: "Backend",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB", exp: "Advanced" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688", exp: "Advanced" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", exp: "Intermediate" },
      { name: "Express", icon: SiExpress, color: "#FFFFFF", exp: "Intermediate" },
    ]
  },
  {
    name: "Database",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", exp: "Advanced" },
      { name: "Redis", icon: SiRedis, color: "#DC382D", exp: "Intermediate" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", exp: "Intermediate" },
    ]
  },
  {
    name: "DevOps & Cloud",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED", exp: "Intermediate" },
      { name: "Linux", icon: SiLinux, color: "#FCC624", exp: "Advanced" },
      { name: "Git", icon: SiGit, color: "#F05032", exp: "Advanced" },
      { name: "AWS", icon: SiGit, color: "#FF9900", exp: "Familiar" },
    ]
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB", exp: "Intermediate" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", exp: "Intermediate" },
      { name: "HTML/CSS", icon: SiHtml5, color: "#E34F26", exp: "Advanced" },
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <div className="font-mono text-cyan-400 mb-2">// SKILLS</div>
        <h2 className="text-3xl md:text-4xl font-bold">
          Tech Stack I <span className="gradient-text">Work With</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILL_CATEGORIES.map((category, idx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-lg font-semibold text-white/80 border-b border-white/10 pb-2">
              {category.name}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {category.skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: any }) {
  const Icon = skill.icon;
  return (
    <div className="group relative bg-[#111827] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(124,58,237,0.2)]">
      <Icon size={28} style={{ color: skill.color }} className="opacity-80 group-hover:opacity-100 transition-opacity" />
      <span className="text-xs font-medium text-muted-foreground group-hover:text-white transition-colors">
        {skill.name}
      </span>
      
      {/* Tooltip on hover */}
      <div className="absolute inset-0 bg-[#111827]/95 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-2 text-center pointer-events-none z-10 border border-primary/20">
        <span className="text-xs font-bold gradient-text">{skill.exp}</span>
      </div>
    </div>
  );
}