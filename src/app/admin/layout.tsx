
import { adminLinks } from "@/components/admin/AdminLinks";
import SiteHomeLeftNav from "@/components/general/SiteHomeLeftNav";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <div className="flex min-h-screen">
      <SiteHomeLeftNav links={adminLinks} />
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}