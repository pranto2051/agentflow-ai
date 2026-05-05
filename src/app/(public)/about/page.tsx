"use client";

import { motion } from "framer-motion";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Brain, Zap, Globe, Shield, Users, Heart } from "lucide-react";

const values = [
  {
    title: "AI Excellence",
    description: "We leverage the latest models like Gemini 1.5 Flash to provide state-of-the-art automation.",
    icon: Brain,
  },
  {
    title: "Global Reach",
    description: "Our platform supports all major social networks, helping you reach audiences worldwide.",
    icon: Globe,
  },
  {
    title: "Security First",
    description: "Your data and account security are our top priorities, with robust encryption and RLS.",
    icon: Shield,
  },
  {
    title: "Efficiency",
    description: "Save hours every week by letting AI handle your professional social presence.",
    icon: Zap,
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/25 text-brand-violet-light text-xs font-medium mb-8"
            >
              <Heart className="h-3 w-3 fill-current" />
              <span>Built by Creators for Creators</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold font-heading mb-6"
            >
              We’re on a mission to <br />
              <span className="gradient-text">Automate Professionalism</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed"
            >
              AgentFlow AI was born from a simple observation: professional social media presence 
              is vital, but maintaining it is exhausting. We built a platform that acts as your 
              digital twin—learning your voice, sharing your insights, and handling the repetitive 
              tasks of social media management.
            </motion.p>
          </section>

          {/* Story Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold font-heading">Our Story</h2>
              <p className="text-text-secondary leading-relaxed">
                In late 2023, our founders noticed that many professionals had brilliant insights 
                trapped in their notes and daily workflows. These insights never made it to LinkedIn 
                or Twitter because the process of &quot;writing for social&quot; felt like a second job.
              </p>
              <p className="text-text-secondary leading-relaxed">
                We realized that the new generation of AI, particularly models with long context 
                windows and high-speed reasoning, could bridge this gap. By creating a system that 
                remembers your professional history and writing style, we&apos;ve enabled thousands of 
                users to stay relevant and influential without the burnout.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-void bg-brand-gradient flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-text-muted font-medium">Trusted by 2,400+ active users</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card aspect-video relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-gradient opacity-10 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-24 h-24 text-brand-violet/20" />
              </div>
            </motion.div>
          </section>

          {/* Values Section */}
          <section className="space-y-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-heading mb-4">The Values We Stand By</h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                These core principles guide every line of code we write and every feature we release.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 group hover:-translate-y-1 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-violet/10 text-brand-violet-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <val.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading mb-3">{val.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{val.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
