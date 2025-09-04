

import FacilityBookingsCalendar from "@/components/facilityBookings/FacilityBookingsCalendar";
import { getBookingsByFacilityList, getFacilityById, getScheduleBlocksByFacilityList } from "@/data/dataAccessLayer";
import { ScheduleFacilityBlock, FacilityBooking } from "@/data/definitions";
import { getTodaysDate } from "@/lib/schedule/dateTimeUtils";


export default async function FacilityBookingsCalendarPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;

    const today = getTodaysDate();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);

    const facility = await getFacilityById(id);
    const blocks: ScheduleFacilityBlock[] = await getScheduleBlocksByFacilityList([id], startOfYear, endOfYear);
    const bookings: FacilityBooking[] = await getBookingsByFacilityList([id], startOfYear, endOfYear);
 
    return (
        <div>
            <FacilityBookingsCalendar initialDate={today} blocks={blocks} bookings={bookings} facility={facility} />
        </div>
    );
}
