import { getAllTeamsByUserIdOrgId, getFacilities } from "@/data/dataAccessLayer";
import { ClubGroupingTeam, FacilityList } from "@/data/definitions";
import BookingCriteria from "@/components/bookings/BookingCriteria";
import SitePageMessage from "@/components/general/SitePageMessage";
import { redirect } from "next/navigation";

export default async function BookingCriteriaPage({ params }
    : { params: Promise<{ userId: string, orgId: number }> }) {
    const { userId, orgId } = await params;

    const all: ClubGroupingTeam[] = await getAllTeamsByUserIdOrgId(userId, orgId);
    console.log("BookingDetail fetched teams:", all);

    if (!all || all.length === 0) {
        console.log("No teams found for user:", userId, "and org:", orgId);
        redirect("/external/no-teams");
    }

    const facilities: FacilityList[] = await getFacilities();

    console.log("BookingCriteriaPage fetched data:", { all, facilities });

    return (
        <main>
            {all ? <BookingCriteria teams={all} allFacilities={facilities} /> : <p>No teams found.</p>}
        </main>
    );
}