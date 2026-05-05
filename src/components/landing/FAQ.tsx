"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is it really free?",
    answer: "Yes! Currently, AgentFlow AI is in beta and we are leveraging the free tiers of Vercel, Supabase, and Google Gemini to provide a completely free experience for our users.",
  },
  {
    question: "Which platforms are supported?",
    answer: "We currently support LinkedIn, Twitter (X), and Facebook. We are working on adding Instagram and Threads soon.",
  },
  {
    question: "How does the AI work?",
    answer: "We use Google's Gemini 1.5 Flash model. It's incredibly fast and smart, allowing us to generate high-quality content based on your instructions and past writing style.",
  },
  {
    question: "Can I schedule posts in advance?",
    answer: "Absolutely. You can set up recurring tasks (daily, weekly, monthly) or one-time posts for any date and time.",
  },
  {
    question: "Is my data secure?",
    answer: "We take security seriously. All your data is stored in Supabase with row-level security, and we use secure OAuth flows for social media connections.",
  },
  {
    question: "What is AI Memory?",
    answer: "AI Memory is a feature where the system learns your professional background, industry, and writing tone over time to make each generation more personalized.",
  },
  {
    question: "Do I need a credit card to sign up?",
    answer: "No credit card is required. You can sign up and start using all features immediately for free.",
  },
  {
    question: "How many tasks can I create?",
    answer: "On the free tier, you can have up to 5 active tasks. Our Pro tier (also currently free during beta) allows for unlimited tasks.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        <Accordion className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="glass-card px-6 border-white/5">
              <AccordionTrigger className="text-left hover:no-underline font-heading">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
