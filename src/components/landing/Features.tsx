"use client";

import { motion } from "framer-motion";
import { Brain, Calendar, Share2, BarChart3, Database, Shield } from "lucide-react";

const features = [
  {
    title: "AI Content Generation",
    description: "Gemini 1.5 Flash writes high-quality, professional posts tailored to your voice.",
    icon: Brain,
    color: "violet",
  },
  {
    title: "Smart Scheduling",
    description: "Set it and forget it. Our intelligent scheduler picks the best times to post.",
    icon: Calendar,
    color: "cyan",
  },
  {
    title: "Multi-Platform Posting",
    description: "One click to rule them all. Publish to LinkedIn, Twitter, and Facebook simultaneously.",
    icon: Share2,
    color: "emerald",
  },
  {
    title: "Performance Analytics",
    description: "Track your growth with deep insights into engagement and reach.",
    icon: BarChart3,
    color: "amber",
  },
  {
    title: "AI Memory System",
    description: "The more you use it, the better it gets. AI remembers your tone and style.",
    icon: Database,
    color: "violet",
  },
  {
    title: "Admin Control",
    description: "Full oversight of your automation workflows and system health.",
    icon: Shield,
    color: "cyan",
  },
];

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Everything you need to automate your presence
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Powerful AI tools built to help you maintain a professional social media presence without the effort.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card p-8 group hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-brand-${feature.color}/15 text-brand-${feature.color}-light`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-3 font-heading">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-violet/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
