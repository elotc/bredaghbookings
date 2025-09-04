import FacilityBookingsSlots from "@/components/facilityBookings/FacilityBookingsSlots";
import { getBookingsByFacilityList } from "@/data/dataAccessLayer";


export default async function FacilityBookingsListPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);
    const bookedSlots = await getBookingsByFacilityList([id], startOfYear, endOfYear);
    console.log("FacilityBookingsListPage: bookedSlots=", bookedSlots);
    return (
        <div>
            <FacilityBookingsSlots bookedSlots={bookedSlots} />
        </div>
    );
}
