"use client";

import { useContext, useEffect } from "react";
import { roboto } from "@/components/general/fonts";
import { UserOrgContext } from "@/components/auth/UserOrgContext";
import { UserOrgRole } from "@/data/definitions";
import MainMenu from "@/components/dashboard/MainMenu";
import RoleSelector from "@/components/role/RoleSelector";


export default function Dashboard({ userOrgs: userOrgsIncoming }: { userOrgs: UserOrgRole[] }) {
    const { userOrgs, setUserOrgs, thisUserOrg, setThisUserOrg } = useContext(UserOrgContext);

    console.log("Dashboard rendered with userOrgs:", userOrgsIncoming);

    useEffect(() => {
        if (!userOrgs || userOrgs[0].userId !== userOrgsIncoming[0]?.userId) {
            setUserOrgs(userOrgsIncoming);
        }
        if (!thisUserOrg) {
            setThisUserOrg(userOrgsIncoming[0]);
        }
    }, [userOrgsIncoming, thisUserOrg]);


    return (
        <main className="flex min-h-screen">
            <div className="flex-1 p-2 mx-auto">
                <p className={`${roboto.className} m-1 text-sm md:text-base`}>
                    Welcome {thisUserOrg?.userName}
                </p>
                <RoleSelector />
                <MainMenu />
            </div>
        </main>
    );
}