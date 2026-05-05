"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Zap,
  Brain,
  ScrollText,
  TrendingUp,
  Activity,
  Shield,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

const adminNavItems = [
  { label: "Overview", icon: LayoutDashboard, href: ROUTES.ADMIN },
  { label: "Users", icon: Users, href: ROUTES.ADMIN_USERS },
  { label: "Automations", icon: Zap, href: ROUTES.ADMIN_AUTOMATIONS },
  { label: "Logs", icon: ScrollText, href: ROUTES.ADMIN_LOGS },
  { label: "Analytics", icon: TrendingUp, href: "/admin/analytics" },
  { label: "System Health", icon: Activity, href: "/admin/health" },
  { label: "Security", icon: Shield, href: "/admin/security" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#0a0805] border-r border-amber-900/20 flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center shadow-orange-500/20 group-hover:scale-110 transition-transform">
            <Shield className="h-5 w-5 text-white fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold font-heading text-orange-500 leading-none">AgentFlow</h1>
              <span className="text-[8px] bg-orange-500/10 text-orange-500 border border-orange-500/20 px-1 rounded uppercase font-bold">Admin</span>
            </div>
            <p className="text-[10px] text-amber-500/50 uppercase tracking-wider mt-1">Control Center</p>
          </div>
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-1 mt-4">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                suppressHydrationWarning
                className={cn(
                  "flex items-center gap-3 px-3 h-10 rounded-md transition-all relative group",
                  isActive
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    : "text-amber-500/40 hover:text-orange-300 hover:bg-orange-500/5"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-orange-400" : "group-hover:scale-110 transition-transform")} />
                <span className="text-sm font-medium">{item.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="admin-sidebar-active"
                    className="absolute left-0 w-0.5 h-6 bg-orange-500 rounded-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-amber-900/20">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="w-full justify-start text-amber-500/40 hover:text-orange-300 hover:bg-orange-500/5 h-9"
          >
            <ArrowLeft className="mr-3 h-4 w-4" />
            <span className="text-sm">Back to App</span>
          </Button>
        </Link>
      </div>
    </aside>
  );
}
