import { useState } from 'react';
import useSWR from 'swr';
import { UpcomingRun, CalendarDay, ScheduledRun } from '@/types/dashboard';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useSchedules() {
  const [currentView, setCurrentView] = useState<'calendar' | 'timeline' | 'list'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const { data, isLoading, mutate } = useSWR(`/api/schedules?view=${currentView}&month=${currentMonth}&year=${currentYear}`, fetcher);

  const reschedule = async (taskId: string, newTime: any) => {
    const res = await fetch(`/api/schedules/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTime)
    });
    if (res.ok) mutate();
    return res.json();
  };

  return {
    upcoming: (data?.upcoming || []) as UpcomingRun[],
    calendar: (data?.calendar || []) as CalendarDay[],
    todayRuns: (data?.todayRuns || []) as ScheduledRun[],
    nextRun: data?.nextRun as ScheduledRun | null,
    streaks: data?.streaks || { current: 0, longest: 0 },
    currentView, setCurrentView,
    currentMonth, currentYear,
    setMonth: (month: number, year: number) => { setCurrentMonth(month); setCurrentYear(year); },
    reschedule,
    isLoading
  };
}
