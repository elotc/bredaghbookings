
import BookingRequestForm from "@/components/bookings/BookingRequestForm";
import { getAllOrgClubGrouping } from "@/data/dataAccessLayer";

export default async function CreateLocationPage() {
    const allOrgs = await getAllOrgClubGrouping();
    const filteredOrgs = allOrgs.filter(org => org.orgType === "Team");

    return (
        <BookingRequestForm
            allOrgs={filteredOrgs}

        />
    );
}

