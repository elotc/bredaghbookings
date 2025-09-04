"use client";

import { StdTabTd, StdTabTh, StdTabUpdInlBtn, StdTabClass, StdTabTitle, StdTabBtnBar, StdTabNavBtn, StdTabActionTd, StdTabDelStrInlBtn } from "@/components/general/StdTable";
import { deleteOrgRoleAction } from "@/lib/admin/OrgRoleActions";
import { Org, OrgUsersType } from "@/data/definitions";
import { useState } from "react";

export default function OrgRoleTable({ org, club, grouping, users }: { org: Org; club?: Org; grouping?: Org; users: OrgUsersType[]; }) {
    const [error, setError] = useState<string | null>(null);
    return (
        <main className="max-w-4xl mx-auto py-8">
            <StdTabTitle
                title={
                    `Users assigned to ` +
                    (club && club.name ? `${club.name} /` : "") +
                    (grouping && grouping.name ? `${grouping.name} /` : "") +
                    (org && org.name ? `${org.name}` : "")
                }
                createPageLink={`/admin/orgs/${org.id}/users/create`}
                error={error}
            />
            <table className={StdTabClass}>
                <thead>
                    <tr>
                        <StdTabTh>User</StdTabTh>
                        <StdTabTh>Role</StdTabTh>
                        <StdTabTh>Actions</StdTabTh>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={org.id + "|" + user.userId + "|" + user.role}>
                            <StdTabTd>{user.userName}</StdTabTd>
                            <StdTabTd>{user.role}</StdTabTd>
                            <StdTabActionTd>
                                <StdTabUpdInlBtn updatePageLink={`/admin/orgs/${org.id}/users/${user.userId}/edit`} />
                                <StdTabDelStrInlBtn
                                    id={org.id + "|" + user.userId + "|" + user.role}
                                    deleteAction={deleteOrgRoleAction}
                                    onError={(msg: string) => setError(msg)}
                                />
                            </StdTabActionTd>
                        </tr>
                    ))}
                </tbody>
            </table>
            <StdTabBtnBar>
                <StdTabNavBtn ref="/admin/orgs" label="Back" />
            </StdTabBtnBar>
        </main>
    );
}