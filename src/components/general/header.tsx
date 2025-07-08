import { User } from "@/data/bookings/definitions";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getAuthUserDetails } from "@/lib/auth/getAuthUserDetails";

export default async function Header() {
    const user = await getAuthUserDetails();
    
    return (
        <header className="w-full flex items-center justify-between px-6 py-3 bg-[#003366] shadow-md">
            <span className="flex items-center">
              <Link href="/">
                <Image
                  src="/bredagh-crest.svg"
                  alt="Bredagh Crest"
                  width={48}
                  height={48}
                  className="mr-4 cursor-pointer"
                />
              </Link>
              <h1 className="text-2xl font-bold text-[#FFD700] tracking-wide">
                Bredagh Bookings App
              </h1>
            </span>

            {user && (
              <span className="flex flex-col items-end text-[#FFD700] text-right text-sm font-medium">
                <span>
                  {user.name}
                  <br />
                  <span className="text-[#FFD700] text-xs">{user.email}</span>
                </span>
                {user && (
                  <Link
                    href="/admin"
                    className="underline text-[#FFD700] hover:text-yellow-300 mb-1"
                  >
                    Admin
                  </Link>
                )}
                <SignOutButton className="mt-2 px-3 py-1 rounded bg-[#FFD700] text-[#003366] font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-colors" />

              </span>
            )}
          </header>
    );
}
