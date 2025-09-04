import SitePageMessage from "@/components/general/SitePageMessage";

export default function NoRoles() {
    return (
        <SitePageMessage
            headline="No teams have been set up for this role.."
            message="Please contact support."
            label="Home"
            link="/home"
        />
    );
}