import { getOrgs } from "@/data/bookings/orgDb";
import OrgTable from "@/components/admin/org/OrgTable";
import Link from "next/link";

export default async function OrgsPage() {
  const orgs = await getOrgs();
  console.log("Fetched orgs:", orgs);
  return (
    <main className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Organisations</h1>
        <Link href="/admin/orgs/create" className="px-4 py-2 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors">
          Add Org
        </Link>
      </div>
      <OrgTable orgs={orgs} />
    </main>
  );
}