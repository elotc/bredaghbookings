"use client";

export default function OrgForm({ org, action }: { org?: any, action: (formData: FormData) => void }) {
  return (
    <form action={action} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
        <input id="name" name="name" type="text" defaultValue={org?.name || ""} required className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="abbrev">Abbrev</label>
        <input id="abbrev" name="abbrev" type="text" defaultValue={org?.abbrev || ""} required className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="status">Status</label>
        <select id="status" name="status" defaultValue={org?.status || "Active"} className="w-full border rounded px-3 py-2">
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Archived">Archived</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="type">Type</label>
        <select id="type" name="type" defaultValue={org?.type || "Club"} className="w-full border rounded px-3 py-2">
          <option value="Club">Club</option>
          <option value="Grouping">Grouping</option>
          <option value="Team">Team</option>
        </select>
      </div>
      <button type="submit" className="px-4 py-2 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors">
        {org ? "Update Org" : "Create Org"}
      </button>
    </form>
  );
}