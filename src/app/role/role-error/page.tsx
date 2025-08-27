import SitePageMessage from "@/components/general/SitePageMessage";

export default async function RoleErrorPage() {
    return (
        <main>
            <SitePageMessage
                headline="Uh-oh! We have a problem - you don't have any permissions."
                message="Contact your administrator to get assigned a role."
                label="Sign In"
                link="/api/auth/signin"
                isError={true} />
        </main>
    );
}