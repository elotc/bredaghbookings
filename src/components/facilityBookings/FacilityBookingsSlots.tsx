"use client";

import { FacilityBooking } from "@/data/definitions";
import { StdTabBtnBar,StdTabClass, StdTabNavBtn, StdTabTd, StdTabTh, StdTabTitle } from "@/components/general/StdTable";

export default function FacilityBookingsSlots({ bookedSlots }: { bookedSlots: FacilityBooking[] }) {

  return (
    <main className="max-w-4xl mx-auto py-8">
          <StdTabTitle title="Facility Bookings" />
          <table className={StdTabClass}>
            <thead>
              <tr>
                <StdTabTh>Description</StdTabTh>
                <StdTabTh>Date</StdTabTh>
                <StdTabTh>Start</StdTabTh>
                <StdTabTh>End</StdTabTh>
              </tr>
            </thead>
            <tbody>
              {bookedSlots.map(slot => (
                <tr key={slot.bookingFacilityId}>
                  <StdTabTd>{slot.bookingRequestDescription}</StdTabTd>
                  <StdTabTd>{slot.date}</StdTabTd>
                  <StdTabTd>{slot.startTime}</StdTabTd>
                  <StdTabTd>{slot.endTime}</StdTabTd>
                </tr>
              ))}
            </tbody>
          </table>
          <StdTabBtnBar>
            <StdTabNavBtn ref="/facilityBookings" label="Back" />
          </StdTabBtnBar>
        </main>
  );
}
