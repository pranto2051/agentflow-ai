"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started",
    features: [
      "5 AI tasks per month",
      "50 AI generations",
      "1 social account",
      "Basic analytics",
      "Standard support",
    ],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "0",
    description: "Best for growing creators",
    features: [
      "Unlimited AI tasks",
      "500 AI generations",
      "3 social accounts",
      "Advanced analytics",
      "Priority support",
      "AI Memory system",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Team",
    price: "0",
    description: "For agencies and teams",
    features: [
      "Everything in Pro",
      "Unlimited social accounts",
      "Team collaboration",
      "Custom AI models",
      "API access",
      "Dedicated manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-text-secondary">
            Everything is currently free for our beta users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass-card p-8 flex flex-col relative ${
                tier.popular ? "border-brand-violet/40 shadow-violet scale-105 z-10" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gradient text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Most Popular ✦
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold font-heading mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-heading">${tier.price}</span>
                  <span className="text-text-muted">/month</span>
                </div>
                <p className="text-sm text-text-muted mt-2">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-sm text-text-secondary">
                    <Check className="h-4 w-4 text-brand-violet shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={tier.popular ? "default" : "secondary"} 
                className={`w-full ${tier.popular ? "bg-brand-gradient" : ""}`}
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
