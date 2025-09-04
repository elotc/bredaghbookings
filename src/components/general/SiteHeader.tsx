
import SiteLogo from "@/components/general/SiteLogo";
import { SignOutButton } from "../auth/sign-out-button";
import Link from "next/link";

export default async function SiteHeader() {

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
          <Link className="text-bredagh-white hover:underline" href="/home">Home</Link>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}


