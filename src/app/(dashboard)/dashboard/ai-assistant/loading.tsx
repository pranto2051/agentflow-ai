import React from 'react';

export default function AIAssistantLoading() {
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden -mx-4 md:-mx-8 -my-4 md:-my-8 bg-background animate-pulse">
      <div className="h-10 border-b border-white/5 bg-white/5" />
      
      <div className="flex-1 flex px-8 py-10 gap-8">
        <div className="flex-1 flex flex-col justify-end gap-6 max-w-[800px] mx-auto">
          <div className="w-full max-w-[80%] h-32 rounded-2xl bg-white/5" />
          <div className="w-full max-w-[80%] self-end h-16 rounded-2xl bg-white/10" />
          <div className="w-full max-w-[80%] h-48 rounded-2xl bg-white/5" />
          <div className="w-full h-[120px] rounded-2xl bg-white/5 mt-4" />
        </div>
        
        <div className="w-[280px] hidden md:block h-full bg-white/5 border-l border-white/5 rounded-tl-2xl" />
      </div>
    </div>
  );
}
