import OrgForm from "@/components/admin/org/OrgForm";
import { createOrgAction } from "@/lib/admin/OrgActions";

export default function CreateOrgPage() {
  return (
    <main className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add Organisation</h1>
      <OrgForm action={createOrgAction} />
    </main>
  );
}