import OrgUserForm from "@/components/admin/org/OrgRoleForm";
import { getOrgById } from "@/data/dataAccessLayer";
import { notFound } from "next/navigation";

export default async function CreateOrgUserPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    if (!id) { notFound();}
    const org = await getOrgById(id);

    return (
        <OrgUserForm 
            org={org} 
        />
    );
}