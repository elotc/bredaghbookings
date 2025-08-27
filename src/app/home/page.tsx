
import { redirect } from "next/navigation";
import Dashboard from "@/app/home/dashboardPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { getAuthUserDetails } from "@/lib/auth/getAuthUserDetails";
import { getOrgRolesByUserId } from "@/data/dataAccessLayer";

export default async function Page() {
    const isAuthenticated = await checkIsAuthenticated();

    console.log("Home page");

    if (!isAuthenticated) {
        console.log("Home Page - User not authenticated, redirecting to sign-in.");
        redirect("/auth/sign-in");
    } else {
        const userDetails = await getAuthUserDetails();
        if (!userDetails || !userDetails.id) { 
            console.error("User details not found or invalid:", userDetails);
            redirect("/auth/sign-in");
        }
        const userOrgs = await getOrgRolesByUserId(userDetails.id);
        if (!userOrgs || userOrgs.length === 0) {
            console.error("No user organizations found for user:", userDetails.id);
            redirect("/role/role-error");
        }
        console.log("Home Page - User authenticated, rendering dashboard.");
        return (
            <main>
                <Dashboard userOrgs={userOrgs} />
            </main>
        );
    }
}


