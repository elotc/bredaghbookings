
import { redirect } from "next/navigation";
import Bookings from "@/app/demobookings/bookingsPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { getFacilities, getLocations } from "@/data/dataAccessLayer";

export default async function Page() {

    const isAuthenticated = await checkIsAuthenticated();
    const locations = await getLocations();
    const facilities = await getFacilities(); 
    
    if (!isAuthenticated) {
         redirect("/auth/");
    } else {
        return(
            <Bookings locations={locations} facilities={facilities}  />
        );
    }
}


