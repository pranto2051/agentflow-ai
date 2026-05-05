"use client";

import { Bell, Search, Command } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export default function TopNav() {
  const pathname = usePathname();

  const getPageTitle = () => {
    const route = Object.entries(ROUTES).find(([_, value]) => value === pathname);
    return route ? route[0].replace(/_/g, " ") : "Dashboard";
  };

  const getBreadcrumb = () => {
    return pathname.split("/").filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" / ");
  };

  return (
    <header className="h-16 sticky top-0 z-30 bg-bg-deep/80 backdrop-blur-xl border-b border-white/5 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold font-heading capitalize">{getPageTitle().toLowerCase()}</h2>
        <p className="text-[10px] text-text-muted uppercase tracking-widest">{getBreadcrumb()}</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Command Bar Placeholder */}
        <div 
          className="hidden md:flex items-center gap-3 px-4 h-9 w-80 bg-brand-violet/5 border border-brand-violet/20 rounded-full cursor-pointer hover:border-brand-violet/40 transition-all group"
          onClick={() => {/* Open Command Modal */}}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-pulse" />
          <span className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">Ask AI anything...</span>
          <div className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-text-muted">
            <Command className="h-2.5 w-2.5" />
            <span>K</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-tighter">3 Running</span>
          </div>

          <button className="relative p-2 text-text-muted hover:text-text-primary transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-violet rounded-full border-2 border-bg-deep" />
          </button>

          <Avatar className="h-8 w-8 border border-white/10 cursor-pointer">
            <AvatarImage src="" />
            <AvatarFallback className="bg-brand-gradient text-[10px] text-white">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
