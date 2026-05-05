'use client';

import React from 'react';
import { Zap, CalendarCheck, Calendar, Flame } from 'lucide-react';
import { StatCard } from '@/components/dashboard/shared/StatCard';
import { motion } from 'framer-motion';
import { stagger, cardIn } from '@/lib/animations/dashboard';

interface ScheduleStatsRowProps {
  nextRunStr?: string;
  nextRunSubtitle?: string;
  todayCount: number;
  weekCount: number;
  streakCurrent: number;
  streakLongest: number;
  isLoading?: boolean;
}

export function ScheduleStatsRow({ nextRunStr, nextRunSubtitle, todayCount, weekCount, streakCurrent, streakLongest, isLoading }: ScheduleStatsRowProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1,2,3,4].map(i => <div key={i} className="h-[120px] rounded-lg bg-white/5 animate-pulse" />)}
      </div>
    );
  }

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <motion.div variants={cardIn}>
        <StatCard 
          label={nextRunSubtitle || "Next scheduled task"}
          value={nextRunStr || "No upcoming runs"}
          icon={Zap}
          accentColor="cyan"
        />
      </motion.div>
      <motion.div variants={cardIn}>
        <StatCard 
          label="runs scheduled today"
          value={todayCount}
          icon={CalendarCheck}
          accentColor="green"
        />
      </motion.div>
      <motion.div variants={cardIn}>
        <StatCard 
          label="posts this week"
          value={weekCount}
          icon={Calendar}
          accentColor="violet"
        />
      </motion.div>
      <motion.div variants={cardIn}>
        <StatCard 
          label={`Longest streak: ${streakLongest} days`}
          value={`${streakCurrent} days`}
          icon={Flame}
          accentColor="amber"
        />
      </motion.div>
    </motion.div>
  );
}
