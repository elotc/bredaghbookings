import BookingDetail from "@/components/bookings/BookingDetail";
import SitePageMessage from "@/components/general/SitePageMessage";
import { getBookingCommentsByBookingId, getBookingFacilitiesByBookingId, getBookingRequestById, getUserById } from "@/data/dataAccessLayer";

export default async function BookingPage({ params }: { params: { bookingId: number } }) {
    const { bookingId } = await params;
    const bookingRequest = await getBookingRequestById(bookingId);
    if (!bookingRequest) {
        return (
            <SitePageMessage 
                headline="Booking Not Found" 
                message="The requested booking could not be found." 
                label="Go to Bookings" 
                link="/bookings" 
                isError={true} />
        );
    }
    const bookingFacilities = await getBookingFacilitiesByBookingId(bookingId);
    const bookingComments = await getBookingCommentsByBookingId(bookingId);
    const requestor = await getUserById(bookingRequest.requestorId);
    return (
        <div>
            <BookingDetail
                bookingRequest={bookingRequest}
                bookingFacilities={bookingFacilities}
                bookingComments={bookingComments}
                requestor={requestor}
            />
        </div>
    );
}