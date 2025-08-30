"use client";

import { FacilityBooking, FacilityList, ScheduleFacilityBlock, UserRole } from "@/data/definitions";
import { BookingConfirmSection } from "@/components/bookings/BookingConfirm";
import { useContext, useEffect, useState } from "react";
import BookingSelectSection from "./BookingSelect";
import SitePageMessage from "../general/SitePageMessage";
import { BookingContext } from "./BookingContext";

export default function BookingSelectConfirm({ blocks, bookings, facilities, authorisers }:
    {
        blocks: ScheduleFacilityBlock[];
        bookings: FacilityBooking[];
        facilities: FacilityList[];
        authorisers: UserRole[];
    }) {

    const { fullTeamName } = useContext(BookingContext);

    if (authorisers.length === 0) {
        return (
            <SitePageMessage
                headline="No Authorisers Available For This Team"
                message={`Please contact your administrator to assign authorisers to ${fullTeamName}.`}
                label="Contact Admin"
                link="/admin/contact"
                isError={true}
            />
        );
    }

    const [hideSelectPage, setHideSelectPage] = useState<boolean>(false);
    const [hideConfirmPage, setHideConfirmPage] = useState<boolean>(true);

    function togglePages() {
        setHideSelectPage(!hideSelectPage);
        setHideConfirmPage(!hideConfirmPage);
    }

    return (
        <div>
            <BookingSelectSection
                blocks={blocks}
                bookings={bookings}
                facilities={facilities}
                hideSelectPage={hideSelectPage}
                togglePages={togglePages}
            />
            <BookingConfirmSection
                facilities={facilities}
                authorisers={authorisers}
                hideConfirmPage={hideConfirmPage}
                togglePages={togglePages} />
        </div>
    );
}
