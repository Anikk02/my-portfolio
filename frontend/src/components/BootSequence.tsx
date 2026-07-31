import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_MESSAGES = [
  "Initializing Portfolio...",
  "Loading Components...",
  "Connecting Backend...",
  "Rendering Experience...",
  "Ready."
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [messages, setMessages] = useState<string[]>([]);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setMessages(prev => [...prev, BOOT_MESSAGES[index]]);
      index++;
      if (index === BOOT_MESSAGES.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0b0f] text-[#22d3ee] font-mono text-sm sm:text-base">
      <div className="w-full max-w-md p-6 flex flex-col gap-2">
        <div className="text-purple-500 mb-4">
          <pre className="text-[10px] leading-tight opacity-50 sm:text-xs">
{`    __          __                        
   / /_  ____ _/ /__  ____  ____  ____  __
  / __ \\/ __ \`/ / _ \\/ __ \\/ __ \\/ __ \\/ /
 / / / / /_/ / /  __/ /_/ / /_/ / /_/ / / 
/_/ /_/\\__,_/_/\\___/ .___/\\____/ .___/_/  
                  /_/         /_/         `}
          </pre>
        </div>
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-purple-500">{'>'}</span> {msg}
              {i === messages.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-4 bg-cyan-400 inline-block ml-1"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}