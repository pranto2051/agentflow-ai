"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Mail, Lock, LogIn, Globe } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import userLoginData from "@/store/Data/userlogin.json";
import adminLoginData from "@/store/Data/adminlogin.json";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    
    const email = values.email.toLowerCase().trim();
    const password = values.password;

    console.log("Attempting login for:", email);

    // 1. Check Demo Data FIRST
    const allDemoLogins = [...userLoginData, ...adminLoginData];
    const foundUser = allDemoLogins.find(
      (u) => u.email.toLowerCase() === email && u.password === password
    );

    if (foundUser) {
      console.log("Demo user found:", foundUser.role);
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success(`Welcome back, ${foundUser.role}! (Demo Mode)`);
      localStorage.setItem("demo_user", JSON.stringify(foundUser));
      router.push(foundUser.role === "admin" ? "/admin" : "/dashboard");
      return;
    }

    // 2. Bypass Supabase if it's not configured (using placeholder)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isPlaceholder = !supabaseUrl || supabaseUrl.includes("placeholder");

    if (isPlaceholder) {
      console.warn("Supabase is not configured. Demo login only.");
      toast.error("Invalid demo credentials. Please check userdata.json or adminlogin.json");
      setIsLoading(false);
      return;
    }

    // 3. Fallback to Supabase ONLY if configured and not a demo user
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (!error) {
        toast.success("Logged in successfully!");
        router.push("/dashboard");
        return;
      }

      toast.error(error.message || "Invalid credentials");
    } catch (err) {
      console.error("Supabase connection error:", err);
      toast.error("Authentication server unreachable.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) toast.error(error.message);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8 space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight gradient-text">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your AgentFlow dashboard
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="name@example.com" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-brand-violet hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#0d0d1a] px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="secondary" className="h-11" onClick={() => handleOAuthLogin('google')}>
          <Globe className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="secondary" className="h-11" onClick={() => handleOAuthLogin('github')}>
          <LogIn className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-brand-violet hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
