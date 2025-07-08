
import { adminLinks } from "@/components/admin/adminLinks";
import LeftNav from "@/components/general/left-nav";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <div className="flex min-h-screen">
      <LeftNav links={adminLinks} />
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}