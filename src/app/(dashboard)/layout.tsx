import Sidebar from "@/components/dashboard/Sidebar";
import TopNav from "@/components/dashboard/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-void flex">
      <Sidebar />
      <div className="flex-grow ml-64 flex flex-col min-h-screen">
        <TopNav />
        <main className="flex-grow p-8 bg-bg-deep/30">
          {children}
        </main>
      </div>
    </div>
  );
}
