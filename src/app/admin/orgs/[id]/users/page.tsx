import { getOrgClubGroupingById, getUserRolesByOrgId } from "@/data/dataAccessLayer";
import { notFound } from "next/navigation";
import { RoleType, StdStatus } from "@/data/definitions";
import OrgRoleTable from "@/components/admin/org/OrgRoleTable";

export default async function OrgUsersPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getOrgClubGroupingById(Number(id));
    const users = await getUserRolesByOrgId(Number(id));

    if (!data) notFound();

    return (
        <OrgRoleTable
            org={data.org}
            club={data.club ? data.club : undefined}
            grouping={data.grouping ? data.grouping : undefined}
            users={
                users
                    ? users.map((user) => ({
                        ...user,
                        status: user.status as StdStatus,
                        role: user.role as RoleType,
                    }))
                    : []
            }
        />
    );
}