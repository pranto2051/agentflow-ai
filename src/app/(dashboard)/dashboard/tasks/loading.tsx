import React from 'react';

export default function TasksLoading() {
  return (
    <div className="h-full flex flex-col animate-pulse">
      <div className="pb-4 border-b border-white/5 mb-6">
        <div className="h-8 bg-white/5 rounded w-32 mb-2"></div>
        <div className="h-4 bg-white/5 rounded w-64"></div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1,2,3,4].map(i => <div key={i} className="h-[120px] rounded-lg bg-white/5" />)}
      </div>
      
      <div className="h-10 bg-white/5 rounded-lg w-full mb-6 max-w-2xl" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map(i => <div key={i} className="h-[180px] rounded-lg bg-white/5" />)}
      </div>
    </div>
  );
}
