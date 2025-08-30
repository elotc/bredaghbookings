
import SiteHeader from "@/components/general/SiteHeader";



export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 m-2 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}