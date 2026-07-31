import { Github, Linkedin, Twitter, Mail, Send } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useSubscribeNewsletter } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribeNewsletter();
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    subscribe.mutate({ data: { email } }, {
      onSuccess: () => {
        toast({
          title: "Subscribed!",
          description: "Thanks for subscribing to my newsletter.",
        });
        setEmail("");
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Could not subscribe. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-sm py-12 mt-20 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <Link href="/" className="text-2xl font-bold font-mono text-white tracking-tighter inline-block mb-4">
              Aniket<span className="text-primary">.</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Backend Engineer building scalable, high-performance systems. Dedicated to clean code, robust architecture, and continuous learning.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all">
                <Twitter size={18} />
              </a>
              <a href="mailto:hello@example.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="/#skills" className="hover:text-primary transition-colors">Skills</a></li>
              <li><a href="/#projects" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="/#experience" className="hover:text-primary transition-colors">Experience</a></li>
              <li><a href="/#blog" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <h4 className="text-white font-semibold mb-4">Subscribe to my newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get occasional emails about backend architecture, system design, and my latest projects. No spam, ever.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/20 border-white/10"
                required
              />
              <Button type="submit" variant="gradient" disabled={subscribe.isPending}>
                <Send className="w-4 h-4 mr-2" /> Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Aniket Paswan. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with React & <span className="text-primary">System Design</span>
          </p>
        </div>
      </div>
    </footer>
  );
}