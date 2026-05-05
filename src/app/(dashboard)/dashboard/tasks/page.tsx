'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/shared/PageHeader';
import { TaskStatsBar } from '@/components/dashboard/tasks/TaskStatsBar';
import { TaskFiltersBar } from '@/components/dashboard/tasks/TaskFiltersBar';
import { TaskGrid } from '@/components/dashboard/tasks/TaskGrid';
import { CreateTaskModal } from '@/components/dashboard/tasks/CreateTaskModal';
import { RunTaskModal } from '@/components/dashboard/tasks/RunTaskModal';
import { TaskLogsDrawer } from '@/components/dashboard/tasks/TaskLogsDrawer';
import { useTasks } from '@/hooks/dashboard/useTasks';
import { GeneratedPost, Task } from '@/types/dashboard';
import { pageIn } from '@/lib/animations/dashboard';

export default function TasksPage() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const { tasks, stats, isLoading, runTask, toggleTask, deleteTask, mutate } = useTasks(filters);

  const [createOpen, setCreateOpen] = useState(false);
  const [runModalOpen, setRunModalOpen] = useState(false);
  const [logsDrawerOpen, setLogsDrawerOpen] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [activeTaskResult, setActiveTaskResult] = useState<GeneratedPost | null>(null);

  const handleRunTask = async (id: string) => {
    try {
      const { success, post } = await runTask(id);
      if (success && post) {
        setActiveTaskId(id);
        setActiveTaskResult(post);
        setRunModalOpen(true);
      }
    } catch (e) {
      console.error("Failed to run task", e);
    }
  };

  const activeTaskObj = tasks.find(t => t.id === activeTaskId) || null;

  return (
    <motion.div variants={pageIn} initial="initial" animate="animate" className="h-full flex flex-col relative pb-20 md:pb-0">
      <PageHeader 
        title="Tasks" 
        subtitle="Manage your AI automation tasks" 
        actions={
          <button 
            onClick={() => setCreateOpen(true)}
            className="hidden md:flex items-center gap-2 bg-[var(--brand-gradient)] text-white px-4 py-2 rounded-lg text-[13px] font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all"
          >
            <Plus size={16} /> New Task
          </button>
        }
      />

      <TaskStatsBar stats={stats} isLoading={isLoading} />
      <TaskFiltersBar filters={filters} onChange={setFilters} />
      
      <TaskGrid 
        tasks={tasks} 
        isLoading={isLoading} 
        filters={filters}
        onRun={handleRunTask} 
        onToggle={toggleTask} 
        onEdit={(id) => { /* open edit */ }} 
        onDelete={deleteTask}
        onViewLogs={(id) => { setActiveTaskId(id); setLogsDrawerOpen(true); }}
        onCreateNew={() => setCreateOpen(true)}
      />

      <button 
        onClick={() => setCreateOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--brand-gradient)] text-white flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)] z-40"
      >
        <Plus size={24} />
      </button>

      <CreateTaskModal 
        open={createOpen} 
        onClose={() => setCreateOpen(false)} 
        onSuccess={mutate} 
      />
      
      <RunTaskModal 
        open={runModalOpen} 
        onClose={() => setRunModalOpen(false)} 
        task={activeTaskObj} 
        result={activeTaskResult} 
      />

      <TaskLogsDrawer 
        open={logsDrawerOpen} 
        onClose={() => setLogsDrawerOpen(false)} 
        taskId={activeTaskId || ''} 
      />
    </motion.div>
  );
}
