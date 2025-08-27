
import { redirect } from "next/navigation";
import { SignInPage } from "@/app/auth/sign-in/signinPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

export default async function Page() {
    const isAuthenticated = await checkIsAuthenticated();

    console.log("auth/sign-in/page - Is user authenticated?", isAuthenticated);
    if (isAuthenticated) {
        redirect("/home");
    } else {
        return (
            <SignInPage></SignInPage>
        );
    }
}