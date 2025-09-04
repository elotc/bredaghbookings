import { notFound } from "next/navigation";
import { getOrgRolesByUserId, getUserById } from "@/data/dataAccessLayer";
import UserRoleTable from "@/components/admin/user/UserRoleTable";

export default async function UserRolePage({ params }: { params: Promise<{ id: string }> }) {
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