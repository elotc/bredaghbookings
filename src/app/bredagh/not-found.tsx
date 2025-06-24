import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-[#003366] text-[#FFD700]">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="mb-8 text-lg">Sorry, the page you are looking for does not exist.</p>
            <Link
                href="/bookings"
                className="px-6 py-3 rounded bg-[#FFD700] text-[#003366] font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-colors"
            >
                Go to Bookings Home
            </Link>
            </main>
    );
}