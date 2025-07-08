

export const adminLinks = [
    {
        group: "Home Pages",
        links: [
            { title: "User Home", href: "/", key: "userHome" },
            { title: "Admin Home", href: "/admin", key: "adminHome" },
        ],
    },
    {
        group: "Organisations and Users",
        links: [
            { title: "Club Admin", href: "/admin/clubs", key: "clubs" },
            { title: "User Admin", href: "/admin/users", key: "users" },
        ],
    },
    {
        group: "Locations & Facilities",
        links: [
            { title: "Location Admin", href: "/admin/locations", key: "locations" },
            { title: "Facility Admin", href: "/admin/facilities", key: "facilities" },
        ],
    },
    {
        group: "Seasons & Schedules",
        links: [
            { title: "Schedule Admin", href: "/admin/schedules", key: "schedules" },
            { title: "Season Admin", href: "/admin/seasons", key: "seasons" },
            { title: "Facility Season Schedule Admin", href: "/admin/facility-schedules", key: "facilitySeasonSchedules" },
        ],
    },
    {
        group: "Platform Admin",
        links: [
            { title: "Event Type Admin", href: "/admin/event-types", key: "eventTypes" },
            { title: "Booking Status", href: "/admin/booking-status", key: "bookingStatus" },
        ],
    },
];