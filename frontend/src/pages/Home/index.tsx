import { Hero } from "./Hero";
import { About } from "./About";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Experience } from "./Experience";
import { Blog } from "./Blog";
import { Contact } from "./Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <div className="container mx-auto px-4 md:px-8 space-y-32 py-20 pb-32">
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Blog />
        <Contact />
      </div>
    </div>
  );
}