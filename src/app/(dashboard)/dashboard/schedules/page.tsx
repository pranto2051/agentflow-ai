'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/dashboard/shared/PageHeader';
import { ScheduleStatsRow } from '@/components/dashboard/schedules/ScheduleStatsRow';
import { ViewToggle } from '@/components/dashboard/schedules/ViewToggle';
import { CalendarView } from '@/components/dashboard/schedules/CalendarView';
import { TimelineView } from '@/components/dashboard/schedules/TimelineView';
import { ListScheduleView } from '@/components/dashboard/schedules/ListScheduleView';
import { RescheduleModal } from '@/components/dashboard/schedules/RescheduleModal';
import { useSchedules } from '@/hooks/dashboard/useSchedules';
import { pageIn } from '@/lib/animations/dashboard';

export default function SchedulesPage() {
  const {
    upcoming, calendar, todayRuns, nextRun, streaks,
    currentView, setCurrentView,
    currentMonth, currentYear, setMonth,
    reschedule, isLoading
  } = useSchedules();

  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [taskToReschedule, setTaskToReschedule] = useState<any>(null);

  const handleRescheduleClick = (taskId: string) => {
    // Mock find
    const task = upcoming.find(t => t.task_id === taskId) || { task_id: taskId, type: 'daily', time: '09:00' };
    setTaskToReschedule(task);
    setRescheduleModalOpen(true);
  };

  const handleSaveReschedule = (taskId: string, newTime: any) => {
    reschedule(taskId, newTime);
  };

  return (
    <motion.div variants={pageIn} initial="initial" animate="animate" className="h-full flex flex-col pb-20 md:pb-0">
      <PageHeader 
        title="Schedules" 
        subtitle="View and manage your automation timeline"
        actions={<ViewToggle view={currentView} onChange={setCurrentView} />}
      />

      <ScheduleStatsRow 
        nextRunStr={nextRun?.next_run ? "in 47 minutes" : undefined}
        todayCount={todayRuns.length}
        weekCount={upcoming.length}
        streakCurrent={streaks.current}
        streakLongest={streaks.longest}
        isLoading={isLoading}
      />

      <div className="flex-1 mt-4">
        <AnimatePresence mode="wait">
          {currentView === 'calendar' && (
            <motion.div key="calendar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <CalendarView days={calendar} currentMonth={currentMonth} currentYear={currentYear} setMonth={setMonth} />
            </motion.div>
          )}
          {currentView === 'timeline' && (
            <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <TimelineView upcoming={upcoming} onReschedule={handleRescheduleClick} onRun={() => {}} />
            </motion.div>
          )}
          {currentView === 'list' && (
            <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ListScheduleView items={upcoming} onReschedule={handleRescheduleClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RescheduleModal 
        open={rescheduleModalOpen} 
        onClose={() => setRescheduleModalOpen(false)} 
        task={taskToReschedule}
        onSave={handleSaveReschedule}
      />
    </motion.div>
  );
}
