import UpdateBookingRequestForm from "@/components/bookings/UpdateBookingRequestForm";
import { getAllUserEmails } from "@/data/dataAccessLayer";


export default async function CreateUserPage() {
    const bookingRequest = {
        team_id: "U14",
        grouping_id: "Hurling",
        requestor_id: "Joe Bloggs",
        approver_id: "Sean O'Neill",
        status: "Requested",
        event_type: "Training",
    };
    const bookingFacilities = [
        { id: "1", name: "CV1" },
        { id: "2", name: "CV2" },
    ];
    const bookingComments = [
        { id: "c1", comment: "Initial request" },
        { id: "c2", comment: "Follow-up comment" },
    ];
    return (
        <UpdateBookingRequestForm
            bookingRequest={bookingRequest}
            bookingFacilities={bookingFacilities}
            bookingComments={bookingComments}
        />
    );
}