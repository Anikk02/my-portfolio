import { useState } from "react";
import { motion } from "framer-motion";
import { useSubmitContact } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";

export function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact.mutate({ data: formData }, {
      onSuccess: () => {
        toast({
          title: "Message sent!",
          description: "I'll get back to you as soon as possible.",
        });
        setFormData({ name: "", email: "", company: "", subject: "", message: "" });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <div className="font-mono text-cyan-400 mb-2">// CONTACT</div>
        <h2 className="text-3xl md:text-4xl font-bold">
          Let's Work <span className="gradient-text">Together</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          <Card className="bg-card/60 backdrop-blur-sm border-white/5 h-full">
            <CardContent className="p-8 flex flex-col h-full justify-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    <Mail />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                    <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                      hello@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-cyan-400 shrink-0 border border-secondary/20">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                    <span className="text-muted-foreground">
                      India
                    </span>
                  </div>
                </div>
                
                <div className="pt-8 mt-8 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-medium text-white">Available for new opportunities</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    I'm currently looking for full-time backend engineering roles or interesting freelance projects.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8"
        >
          <Card className="bg-card/60 backdrop-blur-sm border-white/5 relative overflow-hidden">
            {/* Glow effect behind form */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            <CardContent className="p-8 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Name <span className="text-red-500">*</span></label>
                    <Input 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="John Doe" 
                      required 
                      className="bg-black/20 border-white/10 focus-visible:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Email <span className="text-red-500">*</span></label>
                    <Input 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="john@example.com" 
                      required 
                      className="bg-black/20 border-white/10 focus-visible:ring-primary/50"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Company</label>
                    <Input 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange} 
                      placeholder="Acme Corp" 
                      className="bg-black/20 border-white/10 focus-visible:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Subject <span className="text-red-500">*</span></label>
                    <Input 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      placeholder="Project Inquiry" 
                      required 
                      className="bg-black/20 border-white/10 focus-visible:ring-primary/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Message <span className="text-red-500">*</span></label>
                  <Textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Tell me about your project..." 
                    required 
                    minLength={10}
                    className="min-h-[150px] bg-black/20 border-white/10 focus-visible:ring-primary/50 resize-y"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full sm:w-auto" 
                  variant="gradient"
                  disabled={submitContact.isPending}
                >
                  {submitContact.isPending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="mr-2 h-4 w-4" /> Send Message</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}