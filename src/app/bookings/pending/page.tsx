
import { redirect } from "next/navigation";
import BookingRequests from "@/app/bookings/pending/bookingRequests";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

export default async function Page() {

    const isAuthenticated = await checkIsAuthenticated();
    
    if (!isAuthenticated) {
         redirect("/auth/sign-in");
    } else {
        return(
            <BookingRequests />
        );
    }
}


