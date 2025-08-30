import BookingTable from "@/components/bookings/BookingRequestTable";
import { getAllTeamsByUserId, getBookingRequestsByTeamIds, getOrgRolesByUserId } from "@/data/dataAccessLayer";

export default async function BookingDetail({params}:{params:{userId:string}}) {
    const { userId } = await params;
    const clubGroupingTeamList = await getAllTeamsByUserId(userId);
    const teamIds = clubGroupingTeamList
        .map(team => team.teamId);
    const bookingRequests = await getBookingRequestsByTeamIds(teamIds);
    console.log("BookingDetail fetched data:", { clubGroupingTeamList, teamIds, bookingRequests });
    return (
        <div>
            <BookingTable bookings={bookingRequests} />
        </div>
    );
}
