"use client";

import { UserOrgRole } from "@/data/definitions";
import { useState, createContext } from "react";


export const UserOrgContext = createContext<{
    userOrgs: UserOrgRole[] | null;
    setUserOrgs: (userOrgs: UserOrgRole[] | null) => void;
    thisUserOrg: UserOrgRole | null;
    setThisUserOrg: (userOrg: UserOrgRole | null) => void;
}>({
    userOrgs: null,
    setUserOrgs: () => { },
    thisUserOrg: null,
    setThisUserOrg: () => { }
});


export function UserSelectorContextProvider({ children }: { children: React.ReactNode }) {
    const [userOrgs, setUserOrgs] = useState<UserOrgRole[] | null>(null);
    const [thisUserOrg, setThisUserOrg] = useState<UserOrgRole | null>(null);

    return (
        <UserOrgContext.Provider value={{ userOrgs, setUserOrgs, thisUserOrg, setThisUserOrg }}>
            {children}
        </UserOrgContext.Provider>
    )
}