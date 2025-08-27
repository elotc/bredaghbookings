import { redirect } from "next/navigation";

export default async function Page() {
    console.log("Root page - redirecting to /auth/sign-in");
    redirect("/auth/sign-in");
}