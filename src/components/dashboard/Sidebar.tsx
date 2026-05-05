"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  Bot,
  Calendar,
  Share2,
  BarChart2,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { ROUTES } from "@/lib/constants";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: ROUTES.DASHBOARD },
  { label: "Tasks", icon: CheckSquare, href: ROUTES.TASKS },
  { label: "AI Assistant", icon: Bot, href: ROUTES.AI_ASSISTANT },
  { label: "Schedules", icon: Calendar, href: ROUTES.SCHEDULES },
  { label: "Social Accounts", icon: Share2, href: ROUTES.SOCIAL_ACCOUNTS },
  { label: "Analytics", icon: BarChart2, href: ROUTES.ANALYTICS },
  { label: "Settings", icon: Settings, href: ROUTES.SETTINGS },
];

export default function Sidebar() {
  const pathname = usePathname();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <aside className="w-64 h-screen bg-bg-surface border-r border-white/5 flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-violet group-hover:scale-110 transition-transform">
            <Zap className="h-5 w-5 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-heading gradient-text leading-none">AgentFlow</h1>
            <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">AI Automation</p>
          </div>
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 h-10 rounded-md transition-all relative group",
                  isActive
                    ? "bg-brand-violet/10 text-brand-violet-light border border-brand-violet/20"
                    : "text-text-muted hover:text-text-secondary hover:bg-white/5"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-brand-violet-light" : "group-hover:scale-110 transition-transform")} />
                <span className="text-sm font-medium">{item.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 w-0.5 h-6 bg-brand-violet rounded-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-9 w-9 border border-white/10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-brand-gradient text-xs text-white">JD</AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">John Doe</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-text-muted uppercase tracking-widest">Pro Plan</span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          className="w-full justify-start text-text-muted hover:text-red-400 hover:bg-red-400/10 h-9"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="text-sm">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
