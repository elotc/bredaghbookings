"use client";

import { handleSignOut } from "@/lib/auth/signOutServerAction";
import SitePageMessage from "../general/SitePageMessage";

export default function RoleProblem({ type }: { type: "userSetup" | "roleSetup" }) {

    function clearCache() {
        localStorage.clear();
        handleSignOut();
    }
    return (
        <div>
            {type === "userSetup" && (
                <SitePageMessage
                    headline="Uh-oh! We have a problem - you haven't been set up on the system properly."
                    message="Contact your administrator to validate your configuration."
                    label=""
                    link=""
                    isError={true}
                    actionBtnLabel="Clear Cache"
                    btnAction={clearCache} />
            )}
            {type === "roleSetup" && (
                <SitePageMessage
                    headline="Uh-oh! We have a problem - you don't have any permissions."
                    message="Click on link to select a role or contact your administrator to get assigned a role."
                    label="Select Role"
                    link="/role"
                    isError={true}
                    actionBtnLabel="Clear Cache"
                    btnAction={clearCache} />
            )}
        </div>
    );
}