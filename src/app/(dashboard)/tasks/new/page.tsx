"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Layout, 
  Calendar as CalendarIcon, 
  Share2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { ROUTES, TASK_TYPES, PLATFORMS } from "@/lib/constants";

const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  task_type: z.string(),
  platform: z.string(),
  schedule_time: z.string().optional(),
});

export default function NewTaskPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      task_type: TASK_TYPES.DAILY,
      platform: PLATFORMS.LINKEDIN,
      schedule_time: "09:00",
    },
  });

  async function onSubmit(values: z.infer<typeof taskSchema>) {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error("User not authenticated");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.from("tasks").insert({
      user_id: user.id,
      title: values.title,
      description: values.description,
      task_type: values.task_type,
      platform: values.platform,
      schedule_time: values.schedule_time,
      status: "active",
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    } else {
      toast.success("Task created successfully!");
      router.push(ROUTES.TASKS);
    }
  }

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const steps = [
    { id: 1, title: "Task Info", icon: Layout },
    { id: 2, title: "Schedule", icon: CalendarIcon },
    { id: 3, title: "Platform", icon: Share2 },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold font-heading">Create New Task</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between px-4">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className={`flex flex-col items-center gap-2 ${step >= s.id ? "text-brand-violet-light" : "text-text-muted"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                step === s.id ? "border-brand-violet bg-brand-violet/10 shadow-violet" : 
                step > s.id ? "border-brand-violet bg-brand-violet text-white" : "border-white/10"
              }`}>
                {step > s.id ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{s.title}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-20 h-[2px] mx-4 transition-all ${step > s.id ? "bg-brand-violet" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="glass-card p-8 space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Weekly Learning Update" {...field} />
                      </FormControl>
                      <FormDescription>A name to identify this automation</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What should AI write about?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the topics, learnings, or updates you want the AI to process..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="task_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-bg-surface border-white/10">
                          <SelectItem value={TASK_TYPES.DAILY}>Daily</SelectItem>
                          <SelectItem value={TASK_TYPES.WEEKLY}>Weekly</SelectItem>
                          <SelectItem value={TASK_TYPES.MONTHLY}>Monthly</SelectItem>
                          <SelectItem value={TASK_TYPES.ONE_TIME}>One-time</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="schedule_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Schedule Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormDescription>When should the automation run?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Platform</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-bg-surface border-white/10">
                          <SelectItem value={PLATFORMS.LINKEDIN}>LinkedIn</SelectItem>
                          <SelectItem value={PLATFORMS.TWITTER}>Twitter (X)</SelectItem>
                          <SelectItem value={PLATFORMS.FACEBOOK}>Facebook</SelectItem>
                          <SelectItem value={PLATFORMS.ALL}>All Platforms</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="p-4 rounded-lg bg-brand-violet/5 border border-brand-violet/20 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-violet/20 flex items-center justify-center shrink-0">
                    <Sparkles className="h-5 w-5 text-brand-violet-light" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">AI Preview Enabled</p>
                    <p className="text-xs text-text-muted">Gemini will process your description and generate a professional post based on your schedule.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={step === 1 || isLoading}
            >
              Back
            </Button>
            
            {step < 3 ? (
              <Button type="button" onClick={nextStep} className="bg-brand-violet/10 text-brand-violet-light hover:bg-brand-violet/20">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading} className="bg-brand-gradient shadow-violet">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
