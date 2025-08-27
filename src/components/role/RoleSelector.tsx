"use client"

import { useEffect, useContext, useState } from "react";
import { UserOrgContext } from "@/components/auth/UserOrgContext";
import { SignOutButton } from "../auth/sign-out-button";


export default function RoleSelector() {
    let { userOrgs, setUserOrgs, thisUserOrg, setThisUserOrg } = useContext(UserOrgContext);

    const [roleId, setRoleId] = useState<string>(thisUserOrg ? thisUserOrg.userId + "|" + thisUserOrg.orgId : "");

    useEffect(() => {
        const storedUserOrg = localStorage.getItem("userOrg");
        if (storedUserOrg) {
            const prevUserOrg = JSON.parse(storedUserOrg);
            if (!thisUserOrg !== prevUserOrg) {
                setThisUserOrg(thisUserOrg);
            }
        }
    }, [thisUserOrg, setThisUserOrg]);


    const setSelUserOrg = (value: string) => {
        const [userId, orgId] = value.split("|");
        const selected = userOrgs?.find(org => String(org.orgId) === orgId && String(org.userId) === userId);
        if (!selected) { return; }
        setThisUserOrg(selected);
        setRoleId(value);
        localStorage.setItem("userOrg", JSON.stringify(selected));
    };

    return (
        <div>
            {thisUserOrg && (
                <div className="text-xs">
                    <span className="text-bold">{thisUserOrg.userEmail || "Unknown"}</span>
                    <SignOutButton />
                </div>
            )}
            {(userOrgs && thisUserOrg) && userOrgs.length > 0 && (
                <div>
                    <select
                        id="roleId"
                        name="roleId"
                        value={thisUserOrg.userId + "|" + thisUserOrg.orgId}
                        onChange={e => setSelUserOrg?.(e.target.value)}
                        disabled={userOrgs.length <= 1}
                        className="w-full border rounded text-xs bg-white text-bredagh-maroon"
                    >
                        {[
                            { value: "", label: "Select a role" },
                            ...userOrgs.map(u => ({ value: `${u.userId}|${u.orgId}`, label: `Role: ${u.role} for: ${u.fullName}` }))
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
            )}
        </div>
    )
}
