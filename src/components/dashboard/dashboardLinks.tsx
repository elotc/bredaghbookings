

export const dashboardLinks = [
    {
        group: "Home",
        links: [
            { title: "User Home", href: "/", key: "userHome" },
            { title: "Admin Home", href: "/admin", key: "adminHome" },
        ],
    },
    {
        group: "Bookings",
        links: [
            { title: "Block Booking", href: "/bookings", key: "blockBooking" },
            { title: "Adhoc Booking", href: "/bookings", key: "adhocBooking" },
        ],
    },
    {
        group: "Booking Requests",
        links: [
            { title: "Pending", href: "/bookings/pending", key: "pending" },
            { title: "Historic", href: "/bookings/historic", key: "historic" },
        ],
    },
    {
        group: "Booking Planner",
        links: [
            { title: "By Day Of Week", href: "/bookings/dayOfWeek", key: "dayOfWeek" },
            { title: "By Part Of Day", href: "/bookings/seasons", key: "partOfDay" },
            { title: "By Timeframe", href: "/bookings/facility-schedules", key: "timeframe" },
        ],
    },
];