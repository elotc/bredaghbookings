import BookingTable from "@/components/bookings/BookingRequestTable";
import { getAllTeamsByUserIdOrgId, getBookingRequestsByTeamIds } from "@/data/dataAccessLayer";

export default async function BookingList({ params }
    : { params: Promise<{ userId: string, orgId: number }> }) {

    const { userId, orgId } = await params;

    const clubGroupingTeamList = await getAllTeamsByUserIdOrgId(userId, orgId);

    const teamIds = clubGroupingTeamList.map(team => team.teamId);
    const bookingRequests = await getBookingRequestsByTeamIds(teamIds);

    console.log("BookingDetail fetched data:", { clubGroupingTeamList, teamIds, bookingRequests });

    return (
        <div>
            <BookingTable bookings={bookingRequests} />
        </div>
    );
}
