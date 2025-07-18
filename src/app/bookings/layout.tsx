import { dashboardLinks } from "@/components/dashboard/dashboardLinks";
import LeftNav from "@/components/general/left-nav";


export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">

      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}