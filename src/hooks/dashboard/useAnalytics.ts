import { useState } from 'react';
import useSWR from 'swr';
import { AnalyticsData } from '@/types/dashboard';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useAnalytics() {
  const [range, setRange] = useState<'7d' | '30d' | '90d' | 'custom'>('30d');
  const [customRange, setCustomRange] = useState<{ start: Date; end: Date } | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const queryParams = new URLSearchParams({ range });
  if (customRange) {
    queryParams.append('startDate', customRange.start.toISOString());
    queryParams.append('endDate', customRange.end.toISOString());
  }

  const { data, error, isLoading } = useSWR(`/api/analytics?${queryParams.toString()}`, fetcher);

  const exportCSV = async () => {
    setIsExporting(true);
    try {
      const res = await fetch(`/api/analytics/export?${queryParams.toString()}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'analytics_export.csv';
      a.click();
    } finally {
      setIsExporting(false);
    }
  };

  return {
    data: data as AnalyticsData | undefined,
    isLoading,
    error,
    range,
    setRange,
    customRange,
    setCustomRange,
    exportCSV,
    isExporting
  };
}
