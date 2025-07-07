"use client";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const router = useRouter();

    return (
        <div>
            <h1>Admin Page</h1>
            <button
                className="mt-4 px-6 py-2 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors"
                onClick={() => router.push("/admin/users")}
            >
                Users
            </button>
        </div>
    );
}