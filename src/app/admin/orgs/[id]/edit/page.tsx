import { getOrgClubGroupingById } from "@/data/dataAccessLayer";
import OrgForm from "@/components/admin/org/OrgForm";
import { notFound } from "next/navigation";
import { OrgType } from "@/data/definitions";

export default async function EditOrgPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getOrgClubGroupingById(Number(id));
    if (!data) notFound();

    return (
        <OrgForm 
            orgType={data.org.type as OrgType} 
            org={data.org} 
            clubId={data.club?.id} 
            clubName={data.club?.name} 
            groupingId={data.grouping?.id} 
            groupingName={data.grouping?.name} />
    );
}