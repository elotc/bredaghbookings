import { getAllTeamsByUserId, getFacilities } from "@/data/dataAccessLayer";
import { ClubGroupingTeam, FacilityList } from "@/data/definitions";
import BookingCriteria from "@/components/bookings/BookingCriteria";

export default async function BookingCriteriaPage({ params }: { params: { userId: string } }) {
    const {userId} = await params;

    const all: ClubGroupingTeam[] = await getAllTeamsByUserId(userId);
    const facilities: FacilityList[] = await getFacilities();

    console.log("BookingRequestPage: all teams:", all);
    console.log("BookingRequestPage: all facilities:", facilities);
    return (
        <main>
            {all ? <BookingCriteria teams={all} allFacilities={facilities} /> : <p>No teams found.</p>}
        </main>
    );
}