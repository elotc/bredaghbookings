import SitePageMessage from "@/components/general/SitePageMessage";

export default async function AuthSuccessPage() {
    return (
        <main>
            <SitePageMessage
                headline="Success! Please check your email inbox for a sign-in link."
                message="If you don't see the email, go back to the Sign In page by clicking here"
                label="Sign In"
                link="/api/auth/signin"
                isError={false} />
        </main>
    );
}