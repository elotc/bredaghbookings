"use client";

import { StdTabTd, StdTabTh, StdTabUpdInlBtn, StdTabDelInlBtn, StdTabClass, StdTabTitle, StdTabNavInlBtn, StdTabNavBtn, StdTabBtnBar } from "@/components/general/StdTable";
import { User, UserOrgRole, UserOrgsType } from "@/data/definitions";
import { useState } from "react";

export default function UserRoleTable({ user, userOrgs, showNav = true }: { user: User; userOrgs: UserOrgRole[]; showNav?: boolean; }) {
    const [error, setError] = useState<string | null>(null);
    return (
        <main className="max-w-4xl mx-auto py-8">
            <StdTabTitle title={`Roles for ${user.name}`} error={error} />
            <table className={StdTabClass}>
                <thead>
                    <tr>
                        <StdTabTh>Org Type</StdTabTh>
                        <StdTabTh>Org</StdTabTh>
                        <StdTabTh>Role</StdTabTh>
                        <StdTabTh>Status</StdTabTh>
                    </tr>
                </thead>
                <tbody>
                    {userOrgs.map(org => (
                        <tr key={org.orgId + "|" + org.role}>
                            <StdTabTd>{org.orgType}</StdTabTd>
                            <StdTabTd>{org.fullName}</StdTabTd>
                            <StdTabTd>{org.role}</StdTabTd>
                            <StdTabTd>{org.status}</StdTabTd>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showNav && (
                <StdTabBtnBar>
                    <StdTabNavBtn ref="/admin/users" label="Back to Users" />
                </StdTabBtnBar>
            )}
        </main>
    );
}