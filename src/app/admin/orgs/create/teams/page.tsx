import OrgForm from "@/components/admin/org/OrgForm";
import { OrgType } from "@/data/definitions";

export default async function CreateOrgPage({ searchParams }
  : { searchParams: Promise<{ clubId: number, clubName: string, groupingId: number, groupingName: string }> }) {
  const { clubId, clubName, groupingId, groupingName } = await searchParams;
  
  return (
    <OrgForm orgType={OrgType.TEAM} clubId={clubId} clubName={clubName} groupingId={groupingId} groupingName={groupingName} />
  );
}