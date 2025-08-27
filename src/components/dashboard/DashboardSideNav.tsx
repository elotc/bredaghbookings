"use client";

import { redirect } from "next/navigation";
import { UserOrgContext } from "../auth/UserOrgContext";
import { useContext } from "react";

export default function DashboardNav({ children }: { children?: React.ReactNode }) {
    const { thisUserOrg } = useContext(UserOrgContext);

    return (
        <main>
            <div className="flex flex-1 flex-col justify-center items-center gap-4 px-2 py-8 sm:gap-8 sm:px-4">
                <button
                    className="w-full max-w-md py-6 sm:py-8 rounded-lg bg-[#FFD700] text-[#003366] text-lg sm:text-2xl font-bold shadow-lg hover:bg-yellow-400 transition-colors"
                    onClick={() => { if (thisUserOrg) {redirect('/bookings/' + thisUserOrg.userId); } }}
                >
                    Book A Facility
                </button>
                <button
                    className="w-full max-w-md py-6 sm:py-8 rounded-lg bg-white text-[#003366] text-lg sm:text-2xl font-bold shadow-lg flex items-center justify-between px-4 sm:px-8 hover:bg-gray-100 transition-colors"
                    onClick={() => redirect("/bookings/pending")}
                >
                    <span>Pending Authorisations</span>
                    <span className="inline-block bg-red-600 text-white text-base sm:text-lg font-semibold rounded-full px-3 sm:px-4 py-1 ml-2 sm:ml-4">
                        {10}
                    </span>
                </button>
                <button
                    className="w-full max-w-md py-6 sm:py-8 rounded-lg bg-[#003366] text-[#FFD700] text-lg sm:text-2xl font-bold shadow-lg border-2 border-[#FFD700] hover:bg-[#002244] transition-colors"
                    onClick={() => redirect("/bookings/export")}
                >
                    Export Club Bookings
                </button>
                <button
                    className="w-full max-w-md py-6 sm:py-8 rounded-lg bg-gray-200 text-[#003366] text-lg sm:text-2xl font-bold shadow-lg hover:bg-gray-300 transition-colors"
                    onClick={() => redirect("/bookings/admin")}
                >
                    Facility Admin
                </button>
                {children}
            </div>
        </main>
    );
}