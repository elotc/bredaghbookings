import { notFound } from "next/navigation";
import { getOrgRolesByUserId, getUserById } from "@/data/dataAccessLayer";
import UserRoleTable from "@/components/admin/user/UserRoleTable";
import { RoleType, StdStatus, UserOrgsType } from "@/data/definitions";

export default async function UserRolePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const user = await getUserById(id);
    if (!user ) notFound();

    const orgs = (await getOrgRolesByUserId(id));

    return (
        <main>
            <UserRoleTable user={user} userOrgs={orgs} />
        </main>
    );
}