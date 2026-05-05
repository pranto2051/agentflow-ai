'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Task } from '@/types/dashboard';
import { TaskCard } from './TaskCard';
import { SkeletonCard } from '@/components/dashboard/shared/SkeletonCard';
import { EmptyState } from '@/components/dashboard/shared/EmptyState';
import { stagger, cardIn } from '@/lib/animations/dashboard';

interface TaskGridProps {
  tasks: Task[];
  isLoading: boolean;
  filters: Record<string, string>;
  onRun: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewLogs: (id: string) => void;
  onCreateNew: () => void;
}

export function TaskGrid({ tasks, isLoading, filters, onRun, onToggle, onEdit, onDelete, onViewLogs, onCreateNew }: TaskGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} height={180} rows={3} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0 && Object.keys(filters).length === 0) {
    return (
      <div className="dash-card">
        <EmptyState 
          icon={<Bot size={32} className="text-violet" />}
          title="No tasks yet"
          subtitle="Create your first AI task to start automating your social media presence."
          action={{ label: "Create Task", onClick: onCreateNew }}
        />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="dash-card">
        <EmptyState 
          icon={<Bot size={32} className="text-txt-muted" />}
          title="No matching tasks"
          subtitle="Try adjusting your filters to see more results."
        />
      </div>
    );
  }

  return (
    <motion.div 
      variants={stagger}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      {tasks.map(task => (
        <motion.div key={task.id} variants={cardIn}>
          <TaskCard 
            task={task}
            onRun={onRun}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewLogs={onViewLogs}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
