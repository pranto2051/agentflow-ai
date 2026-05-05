import React from 'react';

export default function SettingsLoading() {
  return (
    <div className="h-full flex flex-col animate-pulse">
      <div className="pb-4 border-b border-white/5 mb-6">
        <div className="h-8 bg-white/5 rounded w-32 mb-2"></div>
        <div className="h-4 bg-white/5 rounded w-64"></div>
      </div>
      
      <div className="flex gap-8">
        <div className="w-[200px] space-y-2">
          {[1,2,3,4].map(i => <div key={i} className="h-10 rounded bg-white/5 w-full" />)}
        </div>
        
        <div className="flex-1">
          <div className="h-[400px] max-w-2xl rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  );
}
