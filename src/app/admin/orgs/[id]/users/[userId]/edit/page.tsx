import OrgUserForm from "@/components/admin/org/OrgRoleForm";
import { getOrgById, getOrgRoleByUserIdOrgId, getUserById } from "@/data/dataAccessLayer";

export default async function EditOrgUserPage({ params }: { params: Promise<{ id: number, userId: string }> }) {
    const { id, userId } = await params;
    const org = await getOrgById(id);
    const user = await getUserById(userId);
    const userRole = await getOrgRoleByUserIdOrgId(userId, id);

    return (
        <OrgUserForm
            org={org}
            user={user}
            userRole={userRole.role}
        />
    );
}