import { getBookingRequests } from "@/data/bookingDB";
import OrgTable from "@/components/admin/org/OrgTable";
import Link from "next/link";
import BookingRequestsTable from "@/components/bookings/BookingRequestsTable";

export default async function BookingRequests() {
  const bookingRequests = await getBookingRequests();

  return (
    <main className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Pending Booking Requests</h1>
      <BookingRequestsTable bookingRequests={bookingRequests} />
    </main>
  );
}
