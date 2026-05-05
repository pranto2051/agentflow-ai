import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({
    overview: {
      totalPosts: 0,
      totalGenerations: 0,
      successRate: 0,
      avgGenerationsPerDay: 0,
      changeVsPrevious: { posts: 0, generations: 0, successRate: 0 }
    },
    postsOverTime: [],
    platformBreakdown: [],
    taskPerformance: [],
    contentInsights: {
      avgTokensPerPost: 0,
      mostUsedTone: 'Professional',
      mostActiveDay: 'Monday',
      mostActiveHour: '9 AM',
      topHashtags: []
    },
    recentPosts: [],
    activityHeatmap: []
  });
}
