import React from 'react';

interface SkeletonCardProps {
  height?: number;
  rows?: number;
  className?: string;
}

export function SkeletonCard({ height = 120, rows = 1, className = '' }: SkeletonCardProps) {
  // We'll create an array of size `rows`
  const rowArray = Array.from({ length: rows });

  return (
    <div 
      className={`dash-card overflow-hidden ${className}`}
      style={{ minHeight: height ? `${height}px` : 'auto' }}
    >
      {/* Purple-tinted shimmer animation overlay */}
      <div 
        className="absolute inset-0 z-10 opacity-30"
        style={{
          background: 'linear-gradient(90deg, rgba(124,58,237,0.04) 25%, rgba(124,58,237,0.15) 50%, rgba(124,58,237,0.04) 75%)',
          backgroundSize: '800px 100%',
          animation: 'shimmer 1.6s infinite linear'
        }}
      />
      
      {/* Custom keyframes for the shimmer */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
      `}} />

      <div className="p-5 flex flex-col gap-4 relative z-0 h-full">
        {rowArray.map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-4 bg-white/5 rounded w-1/3"></div>
            <div className="h-3 bg-white/5 rounded w-2/3"></div>
            {i === 0 && <div className="h-3 bg-white/5 rounded w-1/2"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
