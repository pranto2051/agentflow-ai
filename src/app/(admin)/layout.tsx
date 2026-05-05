import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#06060e] flex">
      <AdminSidebar />
      <div className="flex-grow ml-64 flex flex-col min-h-screen">
        <header className="h-16 sticky top-0 z-30 bg-[#0a0805]/80 backdrop-blur-xl border-b border-amber-900/20 px-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold font-heading text-orange-500">Admin Dashboard</h2>
            <p className="text-[10px] text-amber-500/50 uppercase tracking-widest">Platform Oversight</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-medium text-orange-400 uppercase tracking-tighter">System Normal</span>
            </div>
          </div>
        </header>
        <main className="flex-grow p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
