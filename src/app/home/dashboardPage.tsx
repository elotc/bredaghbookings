"use client";

import DashboardNav from "@/components/dashboard/DashboardSideNav";
import SiteHomeLeftNav from "@/components/general/SiteHomeLeftNav";
import { dashboardLinks } from "@/components/dashboard/dashboardLinks";
import { useContext, useEffect } from "react";
import SiteUserDetails from "@/components/general/SiteUserDetails";
import { roboto } from "@/components/general/fonts";
import { UserOrgContext} from "@/components/auth/UserOrgContext";
import { UserOrgRole } from "@/data/definitions";
import { set } from "zod";
import UserRoleTable from "@/components/admin/user/UserRoleTable";


export default function Dashboard({ userOrgs: userOrgsIncoming }: { userOrgs: UserOrgRole[] }) {
    const { userOrgs, setUserOrgs, thisUserOrg, setThisUserOrg } = useContext(UserOrgContext);

    useEffect(() => {
        if( !userOrgs || userOrgs[0].userId !== userOrgsIncoming[0]?.userId) {
            setUserOrgs(userOrgsIncoming);
        }
        if( !thisUserOrg) {
            setThisUserOrg(userOrgsIncoming[0]);
        }
    }, [userOrgsIncoming, thisUserOrg]);

    return (
        <main className="flex min-h-screen">
            <SiteHomeLeftNav links={dashboardLinks}> <SiteUserDetails /> </SiteHomeLeftNav>
            <div className="flex-1 p-8 mx-auto">
                {thisUserOrg && (
                    <p className={`${roboto.className} m-6 text-sm md:text-base`}>
                        Welcome {thisUserOrg.userName} ({thisUserOrg.userEmail}) to the Bredagh Bookings Dashboard.
                    </p>
                )}
                {userOrgs && userOrgs.length > 1 && (
                    <div className={`${roboto.className} m-6 text-sm md:text-base`}>
                        You are set up with multiple roles. If necessary you can choose a specific role anytime at the top of the page.
                        <UserRoleTable showNav={false}
                            user={{
                                id: userOrgs[0].userId,
                                name: userOrgs[0].userName || "unset",
                                email: userOrgs[0].userEmail || "unset"
                            }}
                            userOrgs={userOrgs}
                        />
                    </div>
                )}
                {thisUserOrg && userOrgs && userOrgs.length === 1 && (
                    <div className={`${roboto.className} m-6 text-sm md:text-base`}>
                        You are a member of {thisUserOrg.fullName} and have been set up with a role of {thisUserOrg.role} at the {thisUserOrg.orgType} level.
                    </div>
                )}
                <DashboardNav />
            </div>
        </main>
    );
}