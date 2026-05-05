import React from 'react';

export default function SocialAccountsLoading() {
  return (
    <div className="h-full flex flex-col animate-pulse">
      <div className="pb-4 border-b border-white/5 mb-6">
        <div className="h-8 bg-white/5 rounded w-48 mb-2"></div>
        <div className="h-4 bg-white/5 rounded w-64"></div>
      </div>
      
      <div className="h-[80px] rounded-lg bg-white/5 mb-6 w-full max-w-2xl" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1,2,3].map(i => <div key={i} className="h-[280px] rounded-lg bg-white/5" />)}
      </div>

      <div className="h-[400px] rounded-lg bg-white/5 w-full" />
    </div>
  );
}
