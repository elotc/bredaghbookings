"use client"

import { useEffect, useContext, useState } from "react";
import { UserOrgContext } from "@/components/auth/UserOrgContext";
import { UserOrgRole } from "@/data/definitions";
import { redirect } from "next/navigation";


export default function RoleSelectorPage({ userOrgsIncoming, forwardLink = '/home' }: { userOrgsIncoming: UserOrgRole[], forwardLink?: string }) {
    const { thisUserOrg, setThisUserOrg, userOrgs, setUserOrgs, } = useContext(UserOrgContext);

    const [roleId, setRoleId] = useState<string>("");

    useEffect(() => {
        if (!userOrgs || userOrgs[0].userId !== userOrgsIncoming[0]?.userId || userOrgs.length !== userOrgsIncoming.length) {
            console.log("RoleSelectorPage - Setting UserOrgs context:", userOrgsIncoming);
            setUserOrgs(userOrgsIncoming);
        }
        if (!thisUserOrg) {
            const storedUserOrg = localStorage.getItem("userOrg");
            if (storedUserOrg) {
                const prevUserOrg = JSON.parse(storedUserOrg);
                setThisUserOrg(prevUserOrg);
                console.log("RoleSelectorPage - Setting thisUserOrg to localSession UserOrg:", prevUserOrg);
            } else if (userOrgsIncoming.length === 1) {
                setThisUserOrg(userOrgsIncoming[0]);
                console.log("RoleSelectorPage - Setting thisUserOrg to localSession UserOrg:", userOrgsIncoming[0]);
            }
        }
        if (thisUserOrg) {
            console.log("RoleSelectorPage - Found thisUserOrg - forward directing", thisUserOrg, forwardLink);
            redirect(forwardLink);
        }
    }, [userOrgsIncoming, thisUserOrg, setThisUserOrg, setUserOrgs, userOrgs, forwardLink]);


    function setSelUserOrg(value: string) {
        console.log("RoleSelectorPage - Role selected:", value);
        const [userId, orgId] = value.split("|");
        const selected = userOrgs?.find(org => String(org.orgId) === orgId && String(org.userId) === userId);
        console.log("RoleSelectorPage - Selected UserOrg:", selected);
        if (!selected) { return; }

        setThisUserOrg(selected);
        setRoleId(value);
        localStorage.setItem("userOrg", JSON.stringify(selected));
    };

    return (
        <div className="flex justify-center text-lg items-center gap-4 px-2 py-2 sm:gap-8 sm:px-2">
            <div>
                <select
                    id="roleId"
                    name="roleId"
                    value={thisUserOrg?.userId + "|" + thisUserOrg?.orgId}
                    onChange={e => setSelUserOrg(e.target.value)}
                    className="w-full border rounded"
                >
                    {[
                        { value: "", label: "Select a role" },
                        ...(userOrgs ?? []).map(u => ({ value: `${u.userId}|${u.orgId}`, label: `Role: ${u.role} for: ${u.fullName}` }))
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
            <button
                onClick={() => { console.log("ForwardLink:", forwardLink); redirect(forwardLink) }}
                disabled={!roleId}
                className="bg-blue-500 text-white rounded px-4 py-2"
            >
                OK
            </button>
        </div>
    )
}
