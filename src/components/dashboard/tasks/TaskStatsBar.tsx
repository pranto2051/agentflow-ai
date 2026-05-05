'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Zap, Sparkles, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/dashboard/shared/StatCard';
import { TaskStats } from '@/types/dashboard';
import { stagger, cardIn } from '@/lib/animations/dashboard';

interface TaskStatsBarProps {
  stats: TaskStats;
  totalPostsGenerated?: number;
  isLoading?: boolean;
}

export function TaskStatsBar({ stats, totalPostsGenerated = 0, isLoading }: TaskStatsBarProps) {
  if (isLoading) {
    return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[1,2,3,4].map(i => <div key={i} className="h-[120px] rounded-lg bg-white/5 animate-pulse" />)}
    </div>;
  }

  return (
    <motion.div 
      variants={stagger}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      <motion.div variants={cardIn}>
        <StatCard 
          label="Total Tasks" 
          value={stats.total} 
          icon={CheckSquare} 
          accentColor="violet" 
        />
      </motion.div>
      <motion.div variants={cardIn}>
        <StatCard 
          label="Active Tasks" 
          value={stats.active} 
          icon={Zap} 
          accentColor="cyan"
          changeDir="neutral"
        />
      </motion.div>
      <motion.div variants={cardIn}>
        <StatCard 
          label="Posts Generated" 
          value={totalPostsGenerated} 
          icon={Sparkles} 
          accentColor="violet" 
        />
      </motion.div>
      <motion.div variants={cardIn}>
        <StatCard 
          label="Success Rate" 
          value="97.3%" 
          icon={TrendingUp} 
          accentColor="green" 
          sparklineData={[90, 92, 95, 96, 94, 98, 97]}
        />
      </motion.div>
    </motion.div>
  );
}
