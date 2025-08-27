import SitePageMessage from "@/components/general/SitePageMessage";

export default async function AuthErrorPage() {
    return (
        <main>
            <SitePageMessage
                headline="Oops! Something went wrong."
                message="Try signing in again. Go back to the Sign In page by clicking here"
                label="Sign In"
                link="/api/auth/signin"
                isError={true} />
        </main>
    );
}