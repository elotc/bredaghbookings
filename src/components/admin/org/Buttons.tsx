import { deleteOrgAction } from '@/lib/admin/OrgActions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateOrg() {
    return (
        <div className="flex justify-end">
            <Link
                href="/admin/orgs/create"
                className="flex h-10 w-40 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                <span className="hidden md:block">Create Org</span>
                <PlusIcon className="h-5 md:ml-4" />
            </Link>
        </div>
    );
}

export function UpdateOrg({ id }: { id: string }) {
    return (
        <Link
            href={`/admin/orgs/${id}/edit`}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
            style={{ minWidth: 80 }}
        >
            Edit
        </Link>
    );
}

export function DeleteOrg({ id }: { id: number }) {
    const deleteOrgWithId = deleteOrgAction.bind(null, id);
    return (
        <form action={deleteOrgWithId} className="inline">
            <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                style={{ minWidth: 80 }}
            >
                Delete
            </button>
        </form>
    );
}
