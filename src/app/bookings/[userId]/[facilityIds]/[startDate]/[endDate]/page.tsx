import BookingSelect from "@/components/bookings/BookingSelect";
import { getBookingsByFacilityList, getFacilitiesByIds, getScheduleBlocksByFacilityList } from "@/data/dataAccessLayer";
import { FacilityBooking, FacilityList, ScheduleFacilityBlock } from "@/data/definitions";
import { get } from "http";

export default async function BookingSelectPage({ params }: { params: { userId: string, facilityIds: string, startDate: Date, endDate: Date } }) {
    const { userId, facilityIds, startDate, endDate } = await params;

    const decodedFacilityIds = decodeURIComponent(facilityIds).split('|').map(id => Number(id));

    const blocks: ScheduleFacilityBlock[] = await getScheduleBlocksByFacilityList(decodedFacilityIds, new Date(startDate), new Date(endDate));
    const bookings: FacilityBooking[] = await getBookingsByFacilityList(decodedFacilityIds, new Date(startDate), new Date(endDate));
    const facilities: FacilityList[] = await getFacilitiesByIds(decodedFacilityIds);

    return (
        <BookingSelect blocks={blocks} bookings={bookings} facilities={facilities} />
    );
}