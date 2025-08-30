"use client";

import { StdTabDelInlBtn, StdTabTh, StdTabTd, StdTabClass, StdTabUpdInlBtn, StdTabTitle, StdTabDupInlBtn, StdTabNavInlBtn, StdTabError, StdTabActionTd, StdTabNavBtn, StdTabBtnBar } from "@/components/general/StdTable";
import { BookingRequest } from "@/data/definitions";

export default function BookingTable({ bookings }: { bookings: BookingRequest[] }) {
  return (
    <main className="max-w-4xl mx-auto py-8">
      <StdTabTitle title="Bookings"/>
      <table className={StdTabClass}>
        <thead>
          <tr>
            <StdTabTh>Create Date</StdTabTh>
            <StdTabTh>Description</StdTabTh>
            <StdTabTh>Status</StdTabTh>
            <StdTabTh>Requestor</StdTabTh>
            <StdTabTh>Num Slots</StdTabTh>
            <StdTabTh>Actions</StdTabTh>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.bookingId}>
              <StdTabTd>{booking.createdAt.toISOString().split('.')[0] || "N/A"}</StdTabTd>
              <StdTabTd>{booking.description || "N/A"}</StdTabTd>
              <StdTabTd>{booking.status}</StdTabTd>
              <StdTabTd>{booking.requestorEmail}</StdTabTd>
              <StdTabTd>{booking.requestedNumSlots || "N/A"}</StdTabTd>
              <StdTabActionTd>
                <StdTabNavInlBtn
                  actionName="View"
                  actionPageLink={`/bookings/view/${booking.bookingId}`}
              />
              </StdTabActionTd>
            </tr>
          ))}
        </tbody>
      </table>
      <StdTabBtnBar>
        <StdTabNavBtn ref="/home" label="Back" />
      </StdTabBtnBar>
    </main>
  );
}