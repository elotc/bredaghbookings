"use client";

import { User } from "@/data/bookings/definitions";
import { useRouter } from "next/navigation";

export default function UserTable({ users }: { users: User[] }) {
    const router = useRouter();

    return (
        <main className="max-w-3xl mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Users</h1>
                <button
                    className="px-4 py-2 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors"
                    onClick={() => router.push("/admin/users/create")}
                >
                    Add User
                </button>
            </div>
            <table className="min-w-full bg-white rounded shadow">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">ID</th>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">Email</th>
                        <th className="py-2 px-4 border-b text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b">{user.id}</td>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};