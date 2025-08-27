"use client";

import { UserOrgRole } from "@/data/definitions";
import { useEffect, useState } from "react";

export default function UserOrgDetails() {

    const [userOrg, setUserOrg] = useState<UserOrgRole | null>(null);

    useEffect(() => {
        const storedUserOrg = localStorage.getItem("userOrg");
        if (storedUserOrg) { setUserOrg(JSON.parse(storedUserOrg)); }
    }, []);

    return (
        <div>
            <h3>User Organization Details</h3>
            {userOrg ? (
                <div>
                    <p>User ID: {userOrg.userId}</p>
                    <p>Organization ID: {userOrg?.orgId}</p>
                    <p>Role: {userOrg?.role}</p>
                    <p>Full Name: {userOrg?.fullName}</p>
                </div>
            ) : (
                <p>No user organization details available.</p>
            )}
        </div>
    );
}
