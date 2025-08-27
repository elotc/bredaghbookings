import { UserOrgRole } from "@/data/definitions";
import { SiteNavBtnBar, SiteNavButton } from "./SiteNavButton";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { useContext } from "react";
import { UserOrgContext } from "@/components/auth/UserOrgContext";
import RoleSelector from "../role/RoleSelector";

export default function SiteUserDetails() {
    const { thisUserOrg } = useContext(UserOrgContext);

    return (
        <>
            <span className="flex flex-col items-start text-white text-sm font-medium">
                <RoleSelector />
                
            </span>
        </>
    );
}
