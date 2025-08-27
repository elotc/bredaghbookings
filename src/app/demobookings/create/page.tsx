"use client";

import CreateBookingRequestForm from "@/components/bookings/CreateBookingRequestForm";

export default function CreateBookingRequestPage() {
    // Replace this with your actual submit logic (e.g. call an API or server action)
    const handleSubmit = async (data: any) => {
        // Example: await createBookingRequestAction(data);
        alert("Booking request submitted!\n" + JSON.stringify(data, null, 2));
        // Optionally, redirect after creation
        // router.push("/admin/booking-requests");
    };

    return <CreateBookingRequestForm onSubmit={handleSubmit} />;
}