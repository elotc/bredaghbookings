"use client";

import { useContext, useEffect } from "react";
import { UserOrgContext } from "@/components/auth/UserOrgContext";
import { UserOrgRole } from "@/data/definitions";
import MainMenu from "@/components/dashboard/MainMenu";
import RoleSelector from "@/components/role/RoleSelector";


export default function Dashboard({ userOrgsIncoming }: { userOrgsIncoming: UserOrgRole[] }) {
    const { userOrgs, setUserOrgs, thisUserOrg, setThisUserOrg } = useContext(UserOrgContext);

    useEffect(() => {
        if (!userOrgs || userOrgs[0].userId !== userOrgsIncoming[0]?.userId || userOrgs.length !== userOrgsIncoming.length) {
            setUserOrgs(userOrgsIncoming);
        }
        if (!thisUserOrg) {
            setThisUserOrg(userOrgsIncoming[0]);
        }
    }, [userOrgsIncoming, thisUserOrg, userOrgs]);

    if (!thisUserOrg) return (<p>Loading...</p>);

    return (
        <main className="flex min-h-screen">
            <div className="flex-1 p-2 mx-auto">
                <p className="m-1 text-sm md:text-base">
                    Welcome {thisUserOrg?.userName}
                </p>
                <RoleSelector />
                <MainMenu />
            </div>
        </main>
    );
}