

export const adminLinks = [
    {
        group: "Home Pages",
        links: [
            { title: "Main Dashboard", href: "/home", key: "userHome" },
            { title: "Admin Dashboard", href: "/admin", key: "adminHome" },
        ],
    },
    {
        group: "Admin",
        links: [
            { title: "Club Admin", href: "/admin/orgs", key: "clubs" },
            { title: "User Admin", href: "/admin/users", key: "users" },
            { title: "Location Admin", href: "/admin/locations", key: "locations" },
            { title: "Schedule Admin", href: "/admin/schedules", key: "schedules" },
            { title: "Facility Schedule Admin", href: "/admin/facility-schedules", key: "facilitySchedules" },
        ],
    },
];