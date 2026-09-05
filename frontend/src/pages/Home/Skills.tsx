import { motion } from "framer-motion";
import { 
  SiPython, SiFastapi, SiJsonwebtokens, SiSqlalchemy,
  SiPostgresql, SiRedis, SiMongodb,
  SiDocker, SiGit, SiGithub, SiGooglecolab,
  SiReact, SiHtml5, SiCss, SiPandas, SiNumpy, SiPytorch,
  SiHuggingface, SiScikitlearn
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import {
  Binary,
  BrainCircuit,
  Code2,
  Database,
  Gauge,
  Network,
  Table2,
  Workflow,
} from "lucide-react";

const SKILL_CATEGORIES = [
  {
    name: "Languages",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB", exp: "Advanced" },
      { name: "Java", icon: FaJava, color: "#ED8B00", exp: "Intermediate" },
      { name: "SQL", icon: Table2, color: "#38BDF8", exp: "Advanced" },
    ]
  },
  {
    name: "Web & Frontend",
    skills: [
      { name: "HTML", icon: SiHtml5, color: "#E34F26", exp: "Intermediate" },
      { name: "CSS", icon: SiCss, color: "#1572B6", exp: "Intermediate" },
      { name: "React.js", icon: SiReact, color: "#61DAFB", exp: "Intermediate" },
    ]
  },
  {
    name: "Backend Development",
    skills: [
      { name: "FastAPI", icon: SiFastapi, color: "#009688", exp: "Advanced" },
      { name: "REST APIs", icon: Network, color: "#22D3EE", exp: "Advanced" },
      { name: "JWT Auth", icon: SiJsonwebtokens, color: "#D63AFF", exp: "Advanced" },
      { name: "SQLAlchemy", icon: SiSqlalchemy, color: "#D71F00", exp: "Advanced" },
      { name: "Async Programming", icon: Workflow, color: "#A78BFA", exp: "Intermediate" },
      { name: "Caching", icon: Gauge, color: "#F59E0B", exp: "Intermediate" },
      { name: "WebSockets", icon: Code2, color: "#34D399", exp: "Intermediate" },
    ]
  },
  {
    name: "Databases",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", exp: "Advanced" },
      { name: "Redis", icon: SiRedis, color: "#DC382D", exp: "Intermediate" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", exp: "Intermediate" },
      { name: "MS SQL Server", icon: Database, color: "#CC2927", exp: "Familiar" },
    ]
  },
  {
    name: "Machine Learning",
    skills: [
      { name: "Pandas", icon: SiPandas, color: "#150458", exp: "Intermediate" },
      { name: "NumPy", icon: SiNumpy, color: "#4D77CF", exp: "Intermediate" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", exp: "Familiar" },
      { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E", exp: "Beginner" },
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E", exp: "Intermediate" },
      { name: "XGBoost", icon: BrainCircuit, color: "#10B981", exp: "Intermediate" },
      { name: "Regression", icon: Binary, color: "#60A5FA", exp: "Intermediate" },
      { name: "Classification", icon: BrainCircuit, color: "#C084FC", exp: "Intermediate" },
    ]
  },
  {
    name: "Tools & Core",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032", exp: "Advanced" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF", exp: "Advanced" },
      { name: "Docker", icon: SiDocker, color: "#2496ED", exp: "Intermediate" },
      { name: "Colab", icon: SiGooglecolab, color: "#F9AB00", exp: "Intermediate" },
      { name: "Data Structures", icon: Code2, color: "#F472B6", exp: "Strong foundation" },
      { name: "Networks", icon: Network, color: "#38BDF8", exp: "Strong foundation" },
      { name: "Operating Systems", icon: Workflow, color: "#A78BFA", exp: "Strong foundation" },
      { name: "DBMS & OOP", icon: Database, color: "#34D399", exp: "Strong foundation" },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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