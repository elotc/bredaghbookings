
import { getAuthUserDetails } from "@/lib/auth/getAuthUserDetails";
import SiteLogo from "@/components/general/SiteLogo";
import { SignOutButton } from "../auth/sign-out-button";

export default async function SiteHeader({ children }: { children?: React.ReactNode }) {

  return (
    <header className="w-full px-6 py-3 bg-bredagh-maroon text-bredagh-white">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <SiteLogo />
          <h1 className="text-2xl font-bold tracking-wide">
            <span className="md:hidden">BBA</span>
            <span className="hidden md:inline">Bredagh Booking App</span>
          </h1>
        </div>
        <div>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}


