"use client";

import dynamic from "next/dynamic";
import { BaseUser, UserOrgRole } from "@/data/definitions";
import { useState, useContext } from "react";
import { UserContext } from "./UserOrgContext";


const RoleSelector = dynamic(() => import("@/components/role/RoleSelector"), { ssr: false });
const DemoUserSelector = dynamic(() => import("@/components/auth/DemoUserSelector"), { ssr: false });

export default function EntryPoint({users, userOrgs}: { users: BaseUser[], userOrgs: UserOrgRole[] }) {
    if (users.length === 0) {
        return <div>No demo users available.</div>;
    }

    const { userId, setUserId } = useContext(UserContext);

    return (
            <div className="">
                <DemoUserSelector users={users} />
                {userId && 
                    <RoleSelector 
                        userOrgs={userOrgs.filter(uo => uo.userId === userId) || []} 
                        userId={userId} />
                }
            </div>
    );
}
