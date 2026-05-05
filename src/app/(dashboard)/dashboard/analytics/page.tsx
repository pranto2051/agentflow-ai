'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/dashboard/shared/PageHeader';
import { AnalyticsStatsRow } from '@/components/dashboard/analytics/AnalyticsStatsRow';
import { EngagementChart } from '@/components/dashboard/analytics/EngagementChart';
import { PlatformBreakdown } from '@/components/dashboard/analytics/PlatformBreakdown';
import { TopPerformingPosts } from '@/components/dashboard/analytics/TopPerformingPosts';
import { DateRangePicker } from '@/components/dashboard/analytics/DateRangePicker';
import { useAnalytics } from '@/hooks/dashboard/useAnalytics';
import { pageIn } from '@/lib/animations/dashboard';
import { SkeletonCard } from '@/components/dashboard/shared/SkeletonCard';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const { stats, chartData, platformBreakdown, topPosts, isLoading } = useAnalytics(dateRange);

  return (
    <motion.div variants={pageIn} initial="initial" animate="animate" className="h-full flex flex-col pb-20 md:pb-0">
      <PageHeader 
        title="Analytics" 
        subtitle="Track your AI automation performance" 
        actions={<DateRangePicker value={dateRange} onChange={setDateRange} />}
      />

      {isLoading ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1,2,3,4].map(i => <SkeletonCard key={i} height={120} />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><SkeletonCard height={400} /></div>
            <div className="lg:col-span-1"><SkeletonCard height={400} /></div>
          </div>
        </>
      ) : (
        <>
          <AnalyticsStatsRow stats={stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EngagementChart data={chartData} />
            </div>
            <div className="lg:col-span-1">
              <PlatformBreakdown data={platformBreakdown} />
            </div>
          </div>

          <TopPerformingPosts posts={topPosts} />
        </>
      )}

    </motion.div>
  );
}
