import { getFacilityCountsPerLocation, getLocations } from "@/data/dataAccessLayer";
import LocationTable from "@/components/admin/location/LocationTable";

export default async function LocationsFacilitiesPage() {
    const locations = await getLocations();
    const facilityCounts = await getFacilityCountsPerLocation();

    return (
        <main>
            <LocationTable locations={locations} facilityCounts={facilityCounts} />
        </main>
    );
}