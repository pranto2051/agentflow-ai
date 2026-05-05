import React from 'react';

export default function SchedulesLoading() {
  return (
    <div className="h-full flex flex-col animate-pulse">
      <div className="pb-4 border-b border-white/5 mb-6 flex justify-between">
        <div>
          <div className="h-8 bg-white/5 rounded w-32 mb-2"></div>
          <div className="h-4 bg-white/5 rounded w-64"></div>
        </div>
        <div className="h-10 w-[240px] bg-white/5 rounded-full" />
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1,2,3,4].map(i => <div key={i} className="h-[120px] rounded-lg bg-white/5" />)}
      </div>
      
      <div className="flex-1 mt-4 rounded-xl bg-white/5 h-[600px]" />
    </div>
  );
}
