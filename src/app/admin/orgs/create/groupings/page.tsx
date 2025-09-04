import OrgForm from "@/components/admin/org/OrgForm";
import { OrgType } from "@/data/definitions";

export default async function CreateOrgPage({ searchParams }: { searchParams: Promise<{ clubId: number, clubName: string }> }) {
  const { clubId, clubName } = await searchParams
  console.log("CreateOrgPage clubId:", clubId, "clubName:", clubName);
  return (
    <OrgForm orgType={OrgType.GROUPING} clubId={clubId} clubName={clubName} />
  );
}