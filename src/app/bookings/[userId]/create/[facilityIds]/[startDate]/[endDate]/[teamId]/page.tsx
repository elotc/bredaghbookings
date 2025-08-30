
import BookingSelectConfirm from "@/components/bookings/BookingSelectConfirm";
import { getBookingsByFacilityList, getFacilitiesByIds, getScheduleBlocksByFacilityList, getTeamAuthorisers } from "@/data/dataAccessLayer";
import { FacilityBooking, FacilityList, ScheduleFacilityBlock, UserRole } from "@/data/definitions";

export default async function BookingSelectPage({ params }: { params: { userId: string, facilityIds: string, startDate: Date, endDate: Date, teamId: number } }) {
    const { userId, facilityIds, startDate, endDate, teamId } = await params;

    const decodedFacilityIds = decodeURIComponent(facilityIds).split('|').map(id => Number(id));

    const blocks: ScheduleFacilityBlock[] = await getScheduleBlocksByFacilityList(decodedFacilityIds, new Date(startDate), new Date(endDate));
    const bookings: FacilityBooking[] = await getBookingsByFacilityList(decodedFacilityIds, new Date(startDate), new Date(endDate));
    const facilities: FacilityList[] = await getFacilitiesByIds(decodedFacilityIds);
    const authorisers: UserRole[] = await getTeamAuthorisers(teamId);

    console.log("BookingSelectPage fetched data:", { blocks, bookings, facilities, authorisers });

    return (
        <BookingSelectConfirm blocks={blocks} bookings={bookings} facilities={facilities} authorisers={authorisers} />
    );
}