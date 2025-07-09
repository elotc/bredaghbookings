import { DeleteOrg, UpdateOrg } from "@/components/admin/org/Buttons";

export default function OrgTable({ orgs }: { orgs: any[] }) {
  return (
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b text-left">ID</th>
          <th className="py-2 px-4 border-b text-left">Name</th>
          <th className="py-2 px-4 border-b text-left">Abbrev</th>
          <th className="py-2 px-4 border-b text-left">Status</th>
          <th className="py-2 px-4 border-b text-left">Type</th>
          <th className="py-2 px-4 border-b text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orgs.map(org => (
          <tr key={org.id}>
            <td className="py-2 px-4 border-b">{org.id}</td>
            <td className="py-2 px-4 border-b">{org.name}</td>
            <td className="py-2 px-4 border-b">{org.abbrev}</td>
            <td className="py-2 px-4 border-b">{org.status}</td>
            <td className="py-2 px-4 border-b">{org.type}</td>
            <td className="py-2 px-4 border-b">
              <div className="flex gap-2">
                <div className="flex-1">
                  <UpdateOrg id={org.id} />
                </div>
                <div className="flex-1">
                  <DeleteOrg id={org.id} />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}