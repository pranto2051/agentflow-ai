"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Play, Pause, CheckSquare as CheckSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import taskDemoData from "@/store/Data/taskdata.json";

interface Task {
  id: string;
  title: string;
  task_type: string;
  platform: string;
  status: string;
  last_run: string | null;
  created_at: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      if (!isMounted) return;
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .order("created_at", { ascending: false });

        if (!isMounted) return;

        if (error) {
          console.warn("Supabase fetch error, using demo data:", error.message);
          setTasks(taskDemoData as Task[]);
          toast.info("Showing demo task data");
        } else {
          setTasks((data as Task[]) || []);
        }
      } catch (err) {
        if (isMounted) {
          console.warn("Fetch failed, using demo data:", err);
          setTasks(taskDemoData as Task[]);
          toast.info("Showing demo task data (Offline)");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active</Badge>;
      case "paused":
        return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Paused</Badge>;
      case "completed":
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Completed</Badge>;
      default:
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Tasks</h1>
          <p className="text-sm text-text-muted">Manage your AI automation workflows</p>
        </div>
        <Link href={ROUTES.TASKS + "/new"}>
          <Button className="bg-brand-gradient hover:brightness-110 shadow-violet">
            <Plus className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
            <Input placeholder="Search tasks..." className="pl-10 h-10 bg-white/5 border-white/10" />
          </div>
          <Button variant="secondary" className="h-10">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] uppercase tracking-widest font-bold">Task Name</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold">Type</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold">Platform</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold">Status</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold">Last Run</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-text-muted">Loading tasks...</TableCell>
              </TableRow>
            ) : tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-brand-violet/10 flex items-center justify-center">
                      <CheckSquareIcon className="h-6 w-6 text-brand-violet-light" />
                    </div>
                    <div>
                      <p className="text-lg font-bold font-heading">No tasks yet</p>
                      <p className="text-sm text-muted-foreground">Create your first AI task to get started</p>
                    </div>
                    <Link href={ROUTES.TASKS + "/new"}>
                      <Button variant="secondary">Create Task</Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell className="capitalize text-text-secondary">{task.task_type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-brand-violet/10 flex items-center justify-center text-[8px] font-bold text-brand-violet-light uppercase">
                        {task.platform[0]}
                      </div>
                      <span className="capitalize text-text-secondary">{task.platform}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell className="text-text-muted text-xs">
                    {task.last_run ? new Date(task.last_run).toLocaleDateString() : "Never"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary" />}>
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-bg-surface border-white/10">
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Edit2 className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          {task.status === 'paused' ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                          {task.status === 'paused' ? 'Resume' : 'Pause'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer text-red-400 hover:text-red-400 focus:text-red-400">
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
