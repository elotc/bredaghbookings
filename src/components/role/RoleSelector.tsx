"use client"

import { useEffect, useContext, useState } from "react";
import { UserOrgContext } from "@/components/auth/UserOrgContext";
import { UserOrgRole } from "@/data/definitions";


export default function RoleSelector() {
    const { userOrgs, thisUserOrg, setThisUserOrg } = useContext(UserOrgContext);

    const [roleId, setRoleId] = useState<string>("");
    const [copyThisUserOrg, setCopyThisUserOrg] = useState<UserOrgRole | null>(null);
    const [copyUserOrgs, setCopyUserOrgs] = useState<UserOrgRole[] | null>(null);

    useEffect(() => {
        // Only run on client side after hydration
        if (typeof window === "undefined") return;

        const storedUserOrg = localStorage.getItem("userOrg");
        if (storedUserOrg) {
            try {
                const prevUserOrg = JSON.parse(storedUserOrg);
                if ((thisUserOrg?.orgId !== prevUserOrg?.orgId) || (thisUserOrg?.userId !== prevUserOrg?.userId)) {
                    setThisUserOrg(prevUserOrg);
                }
            } catch (e) {
                console.error("Failed to parse userOrg from localStorage", e);
            }
        }
    }, []);

    useEffect(() => {
        setCopyThisUserOrg(thisUserOrg);
        setCopyUserOrgs(userOrgs);
        setRoleId(thisUserOrg ? thisUserOrg.userId + "|" + thisUserOrg.orgId : "");
    }, [thisUserOrg, userOrgs]);

    const setSelUserOrg = (value: string) => {
        const [userId, orgId] = value.split("|");
        const selected = userOrgs?.find(org => String(org.orgId) === orgId && String(org.userId) === userId);
        if (selected) {
            localStorage.setItem("userOrg", JSON.stringify(selected));
            setThisUserOrg(selected);
            setRoleId(value);
        }
    };

    return (
        <div className="flex justify-center text-lg items-center gap-4 px-2 py-2 sm:gap-8 sm:px-2">
            <div>
                <select
                    id="roleId"
                    name="roleId"
                    value={copyThisUserOrg?.userId + "|" + copyThisUserOrg?.orgId}
                    onChange={e => setSelUserOrg(e.target.value)}
                    disabled={(copyUserOrgs?.length ?? 0) <= 1}
                    className="w-full border rounded"
                >
                    {[
                        { value: "", label: "Select a role" },
                        ...(copyUserOrgs ?? []).map(u => ({ value: `${u.userId}|${u.orgId}`, label: `Role: ${u.role} for: ${u.fullName}` }))
                    ].map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
