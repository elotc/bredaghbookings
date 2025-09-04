
import RoleProblem from "@/components/role/RoleProblem";
import RoleSelectorPage from "@/components/role/RoleSelectorPage";
import { getOrgRolesByUserId, getUserById } from "@/data/dataAccessLayer";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { getAuthUserDetails } from "@/lib/auth/getAuthUserDetails";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ redirectType: string, id: number }> }) {

    const {redirectType, id} = await params;
    let forwardLink = "/home";

    const isAuthenticated = await checkIsAuthenticated();

    if (!isAuthenticated) {
        console.log("Role Selector Page - User not authenticated, redirecting to sign-in.");
        redirect("/auth/sign-in");
    }

    const userAuthDetails = await getAuthUserDetails();
    if (!userAuthDetails || !userAuthDetails.id) {
        console.error("Role Selector Page - User auth details not found or invalid:", userAuthDetails);
        redirect("/auth/sign-in");
    }

    const userDbDetails = await getUserById(userAuthDetails.id);
    if (!userDbDetails || !userDbDetails.id) {
        console.error("Role Selector Page - User DB details not found or invalid:", userDbDetails);
        return (<RoleProblem type="userSetup" />)
    }

    const userOrgs = await getOrgRolesByUserId(userDbDetails.id);
    if (!userOrgs || userOrgs.length === 0) {
        console.error("Role Selector Page - User organizations not found or invalid:", userOrgs);
        return (<RoleProblem type="roleSetup" />)
    }

    if(redirectType === 'bookings') {
        forwardLink = `/bookings/view/${id}`;
    }

    return (
        <div className="w-4/5 mx-auto p-4">
            <p className="text-lg mb-4">Please select your role to continue:</p>
            <RoleSelectorPage userOrgsIncoming={userOrgs} forwardLink={forwardLink} />
        </div>
    );
}
