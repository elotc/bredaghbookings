import SiteHeader from "@/components/general/SiteHeader";
import RoleSelector from "@/components/role/RoleSelector";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader>
        <RoleSelector />
      </SiteHeader>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}