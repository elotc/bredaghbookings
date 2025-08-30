
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { getAuthUserDetails } from "@/lib/auth/getAuthUserDetails";
import { getOrgRolesByUserId, getUserById } from "@/data/dataAccessLayer";
import RoleProblem from "@/components/role/RoleProblem";

export default async function Page() {
    const isAuthenticated = await checkIsAuthenticated();

    console.log("Home page");

    
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
            return( <RoleProblem type="userSetup" />)
        }
        const userOrgs = await getOrgRolesByUserId(userDbDetails.id);
        if (!userOrgs || userOrgs.length === 0) {
            return( <RoleProblem type="roleSetup" />)
        }

        console.log("Home Page - User authenticated, rendering dashboard.");
        return (
            <main>
                <Dashboard userOrgs={userOrgs} />
            </main>
        );
    }
}


