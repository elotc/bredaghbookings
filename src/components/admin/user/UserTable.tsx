"use client";

import { StdTabTd, StdTabTh, StdTabUpdInlBtn, StdTabDelInlBtn, StdTabClass, StdTabTitle, StdTabNavInlBtn, StdTabActionTd } from "@/components/general/StdTable";
import { deleteUserAction } from "@/lib/admin/UserActions";
import { BaseUser, CountsType } from "@/data/definitions";
import { useState } from "react";

export default function UserTable({ users, userOrgCounts }: { users: BaseUser[], userOrgCounts: CountsType[] }) {
    const [error, setError] = useState<string | null>(null);
    return (
        <main className="max-w-4xl mx-auto py-8">
            <StdTabTitle title="Users" createPageLink="/admin/users/create" error={error} />
            <table className={StdTabClass}>
                <thead>
                    <tr>
                        <StdTabTh>Email</StdTabTh>
                        <StdTabTh>Actions</StdTabTh>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <StdTabTd>{user.email}</StdTabTd>
                            <StdTabActionTd>
                                <StdTabNavInlBtn 
                                    actionName="Roles" 
                                    actionPageLink={`/admin/users/${user.id}/roles`}
                                    count={userOrgCounts.find(uc => uc.id === user.id)?.count || 0} />
                                <StdTabUpdInlBtn updatePageLink={`/admin/users/${user.id}/edit`} />
                                <StdTabDelInlBtn 
                                    id={user.id} 
                                    deleteAction={deleteUserAction} 
                                    onError={(msg: string) => setError(msg)} 
                                />
                            </StdTabActionTd>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}