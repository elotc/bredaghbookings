import { getLocations } from "@/data/dataAccessLayer";
import LocationForm from "@/components/admin/location/LocationForm";

export default async function CreateLocationPage() {
    const locations = await getLocations();

    return (
        <LocationForm
            locations={locations}
         />
    );
}

