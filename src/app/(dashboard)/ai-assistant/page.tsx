"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Send, 
  Sparkles, 
  Brain, 
  RefreshCcw, 
  Copy, 
  Share2, 
  Loader2,
  User as UserIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { PLATFORMS } from "@/lib/constants";

interface Message {
  role: "user" | "ai";
  content: string;
  type?: "post" | "text";
}

export default function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [platform, setPlatform] = useState(PLATFORMS.LINKEDIN);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hello! I'm your AgentFlow AI assistant. Tell me what you've learned today or what you want to post about, and I'll craft a professional social media post for you.",
      type: "text",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskDescription: input,
          platform: platform,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate content");

      const data = await response.json();
      
      const aiMessage: Message = { 
        role: "ai", 
        content: data.content,
        type: "post"
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast.error("Error generating AI response");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-10rem)]">
      {/* Left Panel - Chat */}
      <div className="lg:col-span-2 flex flex-col glass-card overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-violet/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-brand-violet-light" />
            </div>
            <div>
              <h3 className="text-sm font-semibold font-heading">AI Assistant</h3>
              <p className="text-[10px] text-text-muted uppercase tracking-widest">Powered by Gemini 1.5 Flash</p>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10 ${
                    msg.role === "user" ? "bg-bg-surface" : "bg-brand-violet/10"
                  }`}>
                    {msg.role === "user" ? <UserIcon className="h-4 w-4" /> : <Bot className="h-4 w-4 text-brand-violet-light" />}
                  </div>
                  <div className={`space-y-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-brand-violet/20 text-text-primary rounded-tr-none" 
                        : "bg-white/5 text-text-secondary rounded-tl-none border border-white/5"
                    }`}>
                      {msg.type === "post" ? (
                        <div className="font-mono whitespace-pre-wrap">{msg.content}</div>
                      ) : (
                        msg.content
                      )}
                    </div>
                    {msg.type === "post" && (
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted" onClick={() => copyToClipboard(msg.content)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted">
                          <RefreshCcw className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted">
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-violet/10 flex items-center justify-center border border-white/10">
                <Bot className="h-4 w-4 text-brand-violet-light" />
              </div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-violet/40 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-brand-violet/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-brand-violet/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-white/5 bg-white/5 space-y-4">
          <div className="flex gap-4">
            <Select value={platform} onValueChange={(val) => val && setPlatform(val)}>
              <SelectTrigger className="w-40 h-10 bg-bg-surface border-white/10">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent className="bg-bg-surface border-white/10">
                <SelectItem value={PLATFORMS.LINKEDIN}>LinkedIn</SelectItem>
                <SelectItem value={PLATFORMS.TWITTER}>Twitter (X)</SelectItem>
                <SelectItem value={PLATFORMS.FACEBOOK}>Facebook</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-grow relative">
              <Textarea 
                placeholder="What did you learn today?" 
                className="min-h-[56px] max-h-32 bg-bg-surface border-white/10 pr-12 resize-none py-4"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
              <Button 
                size="icon" 
                className="absolute right-2 bottom-2 bg-brand-gradient h-8 w-8 shadow-violet"
                disabled={isLoading || !input.trim()}
                onClick={handleGenerate}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Context */}
      <div className="space-y-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="h-5 w-5 text-brand-violet-light" />
            <h3 className="text-sm font-semibold font-heading">AI Memory</h3>
          </div>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-2">Tone & Style</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Professional, insightful, and concise. Prefers bullet points for key takeaways.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-2">Industries</p>
              <p className="text-xs text-text-secondary">Software Engineering, AI, SaaS</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 bg-brand-violet/5 border-brand-violet/20">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-5 w-5 text-brand-violet-light" />
            <h3 className="text-sm font-semibold font-heading">Quick Commands</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {[
              "📝 Summarize my week",
              "💡 Post about today's learning",
              "📣 Promote a project",
              "🔁 Repurpose last post"
            ].map((cmd, i) => (
              <Button key={i} variant="secondary" className="justify-start text-xs h-9 bg-white/5 border-white/5 hover:border-brand-violet/40 text-left px-3">
                {cmd}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
