
import { redirect } from "next/navigation";
import BookingRequests from "@/app/demobookings/pending/bookingRequests";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

export default async function Page() {

    const isAuthenticated = await checkIsAuthenticated();
    
    if (!isAuthenticated) {
         redirect("/auth/");
    } else {
        return(
            <BookingRequests />
        );
    }
}


