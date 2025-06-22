import { redirect } from "next/navigation";
import { SignInPage } from "@/app/auth/sign-in/signinPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";


export default async function Page() {
    const isAuthenticated = await checkIsAuthenticated();

    if (isAuthenticated) {
        redirect("/bookings");
    } else {
        return (
            <SignInPage></SignInPage>
        );
    }
}