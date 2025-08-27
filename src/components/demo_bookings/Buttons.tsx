
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateBooking() {
    return (
        <div className="flex justify-end">
            <Link
                href="/bookings/create"
                className="flex h-10 w-40 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                <span className="hidden md:block">Create Booking</span>
                <PlusIcon className="h-5 md:ml-4" />
            </Link>
        </div>
    );
}

// export function UpdateBooking({ id }: { id: string }) {
//     return (
//         <Link
//             href={`/bookings/${id}/edit`}
//             className="rounded-md border p-2 hover:bg-gray-100"
//         >
//             {/* <PencilIcon className="w-5" /> */}
//             Edit
//         </Link>
//     );
// }

// export function DeleteBooking({ id }: { id: string }) {
//     const deleteBookingWithId = deleteUserAction.bind(null, id);
//     return (
//         <form action={deleteBookingWithId}>
//             <button className="rounded-md border p-2 hover:bg-gray-100">
//                 <span className="sr-only">Delete</span>
//                 {/* <TrashIcon className="w-5" /> */}
//                 Delete
//             </button>
//         </form>
//     );
// }
export function ViewBooking({ id }: { id: string }) {
    return (
        <Link
            href={`/bookings/${id}/view`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            View
        </Link>
    );
}