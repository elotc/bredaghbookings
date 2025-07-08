

import { Button } from "@/components/general/buttons";
import { updateUserAction } from "@/lib/admin/UserActions";
import Link from "next/link";

export default function UpdateUserForm({ user }: { user: any }) {

    const updateUserWithId = updateUserAction.bind(null, user.id);

    return (
        <form action={updateUserWithId} className="space-y-4 bg-white p-6 rounded shadow">
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={user.name}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user.email}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="status">
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    defaultValue={user.status}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Archived">Archived</option>
                </select>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/admin/users"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Update User</Button>
            </div>
        </form>
    );
}