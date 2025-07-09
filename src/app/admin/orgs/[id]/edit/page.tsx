import { getOrgById } from "@/data/bookings/orgDb";
import OrgForm from "@/components/admin/org/OrgForm";
import { updateOrgAction } from "@/lib/admin/OrgActions";
import { notFound } from "next/navigation";

export default async function EditOrgPage({ params }: { params: { id: string } }) {
    const org = await getOrgById(Number(params.id));
    if (!org) notFound();

    async function action(formData: FormData) {
        "use server";
        await updateOrgAction(Number(params.id), formData);
    }

    return (
        <main className="max-w-lg mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Edit Organisation</h1>
            <OrgForm org={org} action={action} />
        </main>
    );
}