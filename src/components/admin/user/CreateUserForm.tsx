"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserAction } from "@/lib/admin/UserActions";


interface CreateUserFormProps {
    emails: string[];
}

export default function CreateUserForm({ emails }: CreateUserFormProps) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <main className="max-w-lg mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Create User</h1>
            <form action={createUserAction} className="space-y-4 bg-white p-6 rounded shadow">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={`w-full border rounded px-3 py-2 ${emails.includes(email) ? "border-red-500" : ""}`}
                        required
                        aria-invalid={emails.includes(email)}
                    />
                    {emails.includes(email) && (
                        <p className="text-red-600 text-sm mt-1">This email already exists.</p>
                    )}
                    <datalist id="email-suggestions">
                        {emails.map((e, i) => (
                            <option value={e} key={i} />
                        ))}
                    </datalist>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="status">
                        Status
                    </label>
                    <input
                        id="status"
                        name="status"
                        type="text"
                        value="Pending"
                        readOnly
                        className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                        onClick={() => router.push("/admin/users")}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={
                            !name.trim() ||
                            !email.trim() ||
                            emails.includes(email)
                        }
                        className="px-4 py-2 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Create User
                    </button>
                </div>
            </form>
        </main>
    );
}