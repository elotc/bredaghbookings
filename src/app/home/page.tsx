
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { getAuthUserDetails } from "@/lib/auth/getAuthUserDetails";
import { getOrgRolesByUserId, getUserById } from "@/data/dataAccessLayer";
import SitePageMessage from "@/components/general/SitePageMessage";
import { handleSignOut } from "@/lib/auth/signOutServerAction";

export default async function Page() {
    const isAuthenticated = await checkIsAuthenticated();

    console.log("Home page");

    function clearCache() {
        localStorage.clear();
        handleSignOut();
    }

    if (!isAuthenticated) {
        console.log("Home Page - User not authenticated, redirecting to sign-in.");
        redirect("/auth/sign-in");
    } else {
        const userAuthDetails = await getAuthUserDetails();
        if (!userAuthDetails || !userAuthDetails.id) {
            console.error("User auth details not found or invalid:", userAuthDetails);
            redirect("/auth/sign-in");
        }
        const userDbDetails = await getUserById(userAuthDetails.id);
        if (!userDbDetails || !userDbDetails.id) {
            return (<SitePageMessage
                headline="Uh-oh! We have a problem - you haven't been set up on the system properly."
                message="Contact your administrator to validate your configuration."
                label=""
                link=""
                isError={true}
                actionBtnLabel="Clear Cache"
                btnAction={clearCache} />);
        }
        const userOrgs = await getOrgRolesByUserId(userDbDetails.id);
        if (!userOrgs || userOrgs.length === 0) {
            return (<SitePageMessage
                headline="Uh-oh! We have a problem - you don't have any permissions."
                message="Click on link to select a role or contact your administrator to get assigned a role."
                label="Select Role"
                link="/role"
                isError={true}
                actionBtnLabel="Clear Cache"
                btnAction={clearCache} />);
        }

        console.log("Home Page - User authenticated, rendering dashboard.");
        return (
            <main>
                <Dashboard userOrgs={userOrgs} />
            </main>
        );
    }
}


