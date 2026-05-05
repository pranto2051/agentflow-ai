import useSWR from 'swr';
import { Task, TaskStats, GeneratedPost } from '@/types/dashboard';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useTasks(filters?: Record<string, string>) {
  const query = filters ? '?' + new URLSearchParams(filters).toString() : '';
  const { data, error, isLoading, mutate } = useSWR(`/api/tasks${query}`, fetcher);

  const createTask = async (taskData: Partial<Task>) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    if (res.ok) mutate();
    return res.json();
  };

  const updateTask = async (id: string, taskData: Partial<Task>) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    if (res.ok) mutate();
    return res.json();
  };

  const deleteTask = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    if (res.ok) mutate();
    return res.json();
  };

  const runTask = async (id: string): Promise<{ success: boolean; post?: GeneratedPost }> => {
    const res = await fetch(`/api/tasks/${id}/run`, { method: 'POST' });
    return res.json();
  };

  const toggleTask = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}/toggle`, { method: 'POST' });
    if (res.ok) mutate();
    return res.json();
  };

  return {
    tasks: (data?.tasks || []) as Task[],
    total: (data?.total || 0) as number,
    stats: (data?.stats || { total: 0, active: 0, paused: 0, failed: 0, runningNow: 0 }) as TaskStats,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    runTask,
    toggleTask,
    mutate
  };
}
