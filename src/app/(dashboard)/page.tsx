
import { redirect } from "next/navigation";
import Dashboard from "@/app/(dashboard)/dashboardPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

export default async function Page() {

    const isAuthenticated = await checkIsAuthenticated();
    
    if (!isAuthenticated) {
        redirect("/auth/sign-in");
    } else {
        return(
            <Dashboard />
        );
    }
}


