import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col">
            {/* Header Bar */}
            <header className="w-full flex items-center px-6 py-3 bg-[#003366] shadow-md">
                <Link href="/bredagh">
                    <Image
                        src="/bredagh-crest.svg"
                        alt="Bredagh Crest"
                        width={48}
                        height={48}
                        className="mr-4 cursor-pointer"
                    />
                </Link>
                <h1 className="text-2xl font-bold text-[#FFD700] tracking-wide">
                    Bredagh Bookings
                </h1>
            </header>
            <div className="flex-grow p-6 overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}