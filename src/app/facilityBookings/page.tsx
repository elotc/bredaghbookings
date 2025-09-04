
import FacilityBookingsTable from "@/components/facilityBookings/FacilityBookingsTable";
import { getFacilities } from "@/data/dataAccessLayer";

export default async function Page() {
    const facilities = await getFacilities();
    return (
        <div>
            <FacilityBookingsTable facilities={facilities} />
        </div>
    );
}
