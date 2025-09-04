"use client";

import { redirect } from "next/navigation";
import { UserOrgContext } from "../auth/UserOrgContext";
import { useContext } from "react";
import MenuButton from "./MenuButton";
import SitePageMessage from "../general/SitePageMessage";

export default function DashboardNav({ children }: { children?: React.ReactNode }) {
    const { thisUserOrg } = useContext(UserOrgContext);

    let isAdmin = false;
    let isEditor = false;

    let isClub = false;
    let isGrouping = false;

    if (!thisUserOrg || !thisUserOrg.userId) {
        return <SitePageMessage headline="Can't display Main menu." message="Please contact support." label="Help" link="/help" />;
    }

    isAdmin = thisUserOrg.role === "Admin";
    isEditor = thisUserOrg.role === "Admin" || thisUserOrg.role === "Editor";

    isClub = thisUserOrg.orgType === "Club";
    isGrouping = thisUserOrg.orgType === "Club" || thisUserOrg.orgType === "Grouping";

    return (
        <main>
            <div className="flex flex-1 flex-col justify-center items-center gap-4 px-2 py-8 sm:gap-8 sm:px-4">
    
                 <MenuButton
                    type="six"
                    label="Calendar View"
                    onClick={() => { console.log('Redirecting to Calendar View'); redirect('/facilityBookings'); }}
                />
                
                {isEditor && (
                    <MenuButton
                        type="three"
                        label="Book A Facility"
                        onClick={() => { redirect('/bookings/' + thisUserOrg.userId + '/' + thisUserOrg.orgId + '/create/'); }}
                    />
                )}
               
                <MenuButton
                    type="six"
                    label="My Bookings"
                    onClick={() => { redirect("/bookings/" + thisUserOrg.userId + '/' + thisUserOrg.orgId) }}
                />
                {isAdmin && (
                    <MenuButton
                        type="four"
                        label="User Admin"
                        onClick={() => redirect("/admin/users")}
                    />
                )}
                {isAdmin && isGrouping && (
                    <MenuButton
                        type="five"
                        label="Club Admin"
                        onClick={() => redirect("/admin/orgs")}
                    />
                )}
                {isAdmin && isClub && (
                    <MenuButton
                        type="two"
                        label="Facility Admin"
                        onClick={() => redirect("/admin/locations")}
                    />
                )}
                {isAdmin && isClub && (
                    <MenuButton
                        type="two"
                        label="Schedule Admin"
                        onClick={() => redirect("/admin/schedules")}
                    />
                )}
                {children}
            </div>
        </main>
    );
}
