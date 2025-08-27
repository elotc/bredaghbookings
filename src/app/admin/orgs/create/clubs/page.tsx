import OrgForm from "@/components/admin/org/OrgForm";
import { OrgType } from "@/data/definitions";

export default function CreateOrgPage() {
  return (
    <OrgForm orgType={OrgType.CLUB} />
  );
}