import { CreateBooking, ViewBooking } from "@/components/bookings/Buttons";

type BookingRequestsTableProps = {
    bookingRequests: any[];
};

export default function BookingRequestsTable({ bookingRequests }: BookingRequestsTableProps) {
    return (
        <main className="max-w-3xl mx-auto py-8">
            <CreateBooking />
            <table className="min-w-full bg-white rounded shadow">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Team</th>
                        <th className="py-2 px-4 border-b text-left">Grouping</th>
                        <th className="py-2 px-4 border-b text-left">Requestor</th>
                        <th className="py-2 px-4 border-b text-left">Status</th>
                        <th className="py-2 px-4 border-b text-left">Event Type</th>
                        <th className="py-2 px-4 border-b text-left">Abbrev</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingRequests.map((req: any) => (
                        <tr key={req.booking_id}>
                            <td className="py-2 px-4 border-b">{req.team_id}</td>
                            <td className="py-2 px-4 border-b">{req.grouping_id}</td>
                            <td className="py-2 px-4 border-b">{req.requestor_id}</td>
                            <td className="py-2 px-4 border-b">{req.status}</td>
                            <td className="py-2 px-4 border-b">{req.event_type}</td>
                            <td className="py-2 px-4 border-b">{req.booking_abbrev}</td>
                            <td className="py-2 px-4 border-b">
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <ViewBooking id={req.booking_id} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}