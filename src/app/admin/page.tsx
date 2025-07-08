"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminLinks } from "@/components/admin/adminLinks";

// Dummy fetch functions for row counts (replace with real API calls)
async function fetchCount(endpoint: string): Promise<number> {
    // Replace with your actual API endpoints or DB calls
    // Example: const res = await fetch(`/api/admin/count/${endpoint}`);
    // return (await res.json()).count;
    return Math.floor(Math.random() * 100); // Dummy count for demo
}



export default function AdminPage() {
    const router = useRouter();
    const [counts, setCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        async function loadCounts() {
            const newCounts: Record<string, number> = {};
            for (const group of adminLinks) {
                for (const link of group.links) {
                    newCounts[link.key] = await fetchCount(link.key);
                }
            }
            setCounts(newCounts);
        }
        loadCounts();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8">Administration Home Page</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminLinks.flatMap(group =>
                    group.links.map(link => (
                        <div
                            key={link.key}
                            className="bg-white rounded-lg shadow p-6 flex flex-col justify-between hover:shadow-lg transition cursor-pointer border border-gray-200"
                            onClick={() => router.push(link.href)}
                        >
                            <div>
                                <div className="text-lg font-semibold mb-2">{link.title}</div>
                                <div className="text-gray-500 text-sm">{group.group}</div>
                            </div>
                            <div className="mt-4 text-3xl font-bold text-[#003366]">
                                {counts[link.key] !== undefined ? counts[link.key] : "..."}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}