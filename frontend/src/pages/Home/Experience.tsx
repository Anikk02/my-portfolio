import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    id: 1,
    role: "B.Tech in Computer Science & Engineering",
    company: "Dr. A.P.J. Kalam Technical University, Uttar Pradesh, India",
    period: "GPA: 7.79",
    description: "Building a strong foundation across data structures and algorithms, computer networks, operating systems, database management systems, and object-oriented programming.",
    skills: ["Data Structures & Algorithms", "Computer Networks", "Operating Systems", "DBMS", "OOP"]
  },
  {
    id: 2,
    role: "Backend Systems Builder",
    company: "Independent Project Work",
    period: "2026 — Present",
    description: "Designing modular backend solutions with FastAPI, REST APIs, JWT authentication, SQLAlchemy, asynchronous programming, caching, and WebSockets.",
    skills: ["Python", "FastAPI", "REST APIs", "JWT", "SQLAlchemy"]
  },
  {
    id: 3,
    role: "AI & NLP Project Work",
    company: "Mental Health Support Chatbot",
    period: "Sep 2025 — Dec 2025",
    description: "Developed a context-aware chatbot with a fine-tuned T5 Transformer, semantic retrieval, and safety-aware response generation using sentiment analysis.",
    skills: ["PyTorch", "Hugging Face", "Sentence Transformers", "NLP", "MongoDB"]
  }
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="font-mono text-cyan-400 mb-2">// EXPERIENCE</div>
        <h2 className="text-3xl md:text-4xl font-bold">
          Education & <span className="gradient-text">Project Focus</span>
        </h2>
      </motion.div>

      <div className="relative pl-4 md:pl-0">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[15px] md:left-[50%] top-2 bottom-2 w-[2px] bg-white/10 -translate-x-1/2 md:-translate-x-1/2" />
        
        <div className="flex flex-col gap-12">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[15px] md:left-1/2 w-4 h-4 rounded-full bg-[#0a0b0f] border-2 border-primary -translate-x-1/2 top-1.5 z-10 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
              
              {/* Empty space for alignment */}
              <div className="hidden md:block w-1/2" />
              
              {/* Content Card */}
              <div className={`w-full md:w-1/2 pl-12 md:px-12`}>
                <div className={`bg-card/60 backdrop-blur-sm border border-white/10 p-6 rounded-xl relative hover:border-primary/30 transition-colors group ${idx % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                  {/* Arrow pointing to timeline */}
                  <div className={`absolute top-3 w-4 h-4 bg-card/60 border-t border-l border-white/10 transform rotate-45 -left-2 md:-left-2 ${idx % 2 === 0 ? "md:left-auto md:-right-2 md:rotate-[225deg]" : ""}`} />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                    <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded inline-block w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-primary mb-4 font-medium">{exp.company}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="text-xs font-medium text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20"
      >
        <div className="font-mono text-cyan-400 mb-2">// CERTIFICATIONS</div>
        <h3 className="text-2xl md:text-3xl font-bold mb-6">
          Continuous <span className="gradient-text">Learning</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Python Programming Certification",
              detail: "Data structures and algorithmic problem-solving",
            },
            {
              title: "Generative AI Essentials",
              detail: "TCS iON",
            },
            {
              title: "SQL (Basics)",
              detail: "HackerRank",
            },
          ].map((cert) => (
            <div
              key={cert.title}
              className="rounded-xl border border-white/10 bg-card/60 p-5 hover:border-primary/30 transition-colors"
            >
              <h4 className="font-semibold text-white">{cert.title}</h4>
              <p className="text-sm text-muted-foreground mt-2">{cert.detail}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}