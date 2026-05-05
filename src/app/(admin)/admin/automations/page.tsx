"use client";

import { motion } from "framer-motion";
import AutomationStatsBar from "@/components/admin/automations/AutomationStatsBar";
import { Search, Filter, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const mockAutomations = [
  {
    id: "1",
    user: { name: "John Doe", email: "john@example.com", initial: "JD" },
    task: "LinkedIn Post Gen",
    platform: "LinkedIn",
    status: "success",
    preview: "Excited to announce our new AI features! #AI #Innovation...",
    duration: "1.2s",
    triggered: "2 mins ago"
  },
  {
    id: "2",
    user: { name: "Jane Smith", email: "jane@example.com", initial: "JS" },
    task: "Twitter Thread",
    platform: "Twitter",
    status: "running",
    preview: "1/5 Why AI is changing the world as we know it...",
    duration: "0.8s",
    triggered: "Just now"
  },
  {
    id: "3",
    user: { name: "Mike Ross", email: "mike@example.com", initial: "MR" },
    task: "Daily FB Update",
    platform: "Facebook",
    status: "failed",
    preview: "Check out this amazing article about productivity...",
    duration: "4.5s",
    triggered: "15 mins ago"
  }
];

export default function AutomationsAdminPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold font-heading text-orange-500">Automation Command Center</h1>
        <p className="text-sm text-text-muted">Monitor and manage all platform automations in real-time</p>
      </div>

      <AutomationStatsBar />

      <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-grow max-w-md w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
          <Input placeholder="Search user, task, or platform..." className="pl-10 h-10 bg-white/5 border-white/10" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="secondary" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] uppercase tracking-widest font-bold">User</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold">Task Name</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold">Platform</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold">Status</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold">AI Preview</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold">Duration</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAutomations.map((item) => (
              <TableRow key={item.id} className="border-white/5 hover:bg-white/5 group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-white/10">
                      <AvatarFallback className="bg-orange-500/20 text-orange-500 text-xs font-bold">
                        {item.user.initial}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.user.name}</span>
                      <span className="text-[10px] text-text-muted">{item.user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium">{item.task}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-white/5 text-[10px] uppercase font-bold">
                    {item.platform}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      item.status === "success" ? "bg-emerald-500" :
                      item.status === "running" ? "bg-cyan-500 animate-pulse" : "bg-red-500"
                    )} />
                    <span className="text-xs capitalize">{item.status}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <span className="text-[11px] font-mono text-text-muted italic truncate block">
                    {item.preview}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-amber-500">{item.duration}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-orange-500">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
