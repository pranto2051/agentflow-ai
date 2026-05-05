"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/25 text-brand-violet-light text-xs font-medium mb-8"
      >
        <Sparkles className="h-3 w-3 animate-pulse" />
        <span>✦ Now with Gemini 1.5 Flash</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6 max-w-4xl"
      >
        Automate Your <br />
        <span className="gradient-text">Professional Voice</span> <br />
        with AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-text-secondary max-w-xl mb-10"
      >
        Create tasks, let AI write your content, and publish automatically to
        LinkedIn, Twitter, and more — while you sleep.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 mb-16"
      >
        <Link href="/signup">
          <Button size="lg" className="h-12 px-8 bg-brand-gradient hover:brightness-110 transition-all shadow-violet">
            Start Free Today →
          </Button>
        </Link>
        <Button variant="ghost" size="lg" className="h-12 px-8 text-text-accent hover:bg-brand-violet/10">
          <Play className="mr-2 h-4 w-4 fill-current" />
          Watch Demo
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative w-full max-w-5xl mx-auto"
      >
        <div className="glass-card overflow-hidden shadow-2xl border-white/10">
          <div className="h-8 bg-bg-surface flex items-center gap-1.5 px-4 border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <div className="aspect-video bg-bg-deep relative overflow-hidden">
             {/* Mockup of dashboard */}
             <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/20 to-brand-cyan/20 opacity-50" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text-muted text-sm font-mono">
                [ AgentFlow Dashboard Preview ]
             </div>
          </div>
        </div>
        
        {/* Glow effect behind visual */}
        <div className="absolute -inset-4 bg-brand-violet/20 blur-3xl -z-10 rounded-full opacity-50" />
      </motion.div>

      <div className="mt-20 text-center">
        <p className="text-xs uppercase tracking-widest text-text-muted mb-8">Trusted by 2,400+ professionals</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale">
          {/* Placeholder logos */}
          <div className="text-xl font-bold">VERCEL</div>
          <div className="text-xl font-bold">SUPABASE</div>
          <div className="text-xl font-bold">GEMINI</div>
          <div className="text-xl font-bold">LINEAR</div>
          <div className="text-xl font-bold">RAYCAST</div>
        </div>
      </div>
    </section>
  );
}
