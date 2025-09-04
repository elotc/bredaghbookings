import BookingDetail from "@/components/bookings/BookingDetail";
import SitePageMessage from "@/components/general/SitePageMessage";
import { getBookingCommentsByBookingId, getBookingFacilitiesByBookingId, getBookingRequestById, getOrgRolesByUserId, getUserById } from "@/data/dataAccessLayer";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

export default async function BookingPage({ params }: { params: Promise<{ bookingId: number }> }) {
    const { bookingId } = await params;

    const isAuthenticated = await checkIsAuthenticated();

    if (!isAuthenticated) {
        return (
            <SitePageMessage
                headline="You are not authenticated on this browser."
                message="Please sign in to continue and then click on the email link"
                label="Go to Sign In"
                link="/auth/sign-in"
                isError={true} />
        );
    }

    const bookingRequest = await getBookingRequestById(bookingId);
    if (!bookingRequest) {
        return (
            <SitePageMessage
                headline="Booking Not Found"
                message="The requested booking could not be found."
                label="Go to Home"
                link="/home"
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