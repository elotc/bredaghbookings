
import { getAuthUserDetails } from "@/lib/auth/getAuthUserDetails";
import SiteLogo from "@/components/general/SiteLogo";

export default async function SiteHeader({ children }: { children?: React.ReactNode }) {
  const user = await getAuthUserDetails();

  return (
  <header className="w-full px-6 py-3 bg-bredagh-maroon text-bredagh-white">
    <div className="flex flex-row items-center">
      <div className="w-1/4">
        <SiteLogo />
      </div>
      <div className="w-1/2 flex justify-center">
        <h1 className="text-2xl font-bold tracking-wide">
          Bredagh Bookings App
        </h1>
      </div>
      <div className="w-1/4 flex justify-end">
        {children}
      </div>
    </div>
  </header>
  );
}


