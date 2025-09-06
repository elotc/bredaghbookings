"use client";

import { StdTabTh, StdTabTd, StdTabClass, StdTabTitle, StdTabNavInlBtn, StdTabActionTd, StdTabNavBtn, StdTabBtnBar } from "@/components/general/StdTable";
import { BookingRequest } from "@/data/definitions";

export default function BookingTable({ bookings }: { bookings: BookingRequest[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="max-h-screen overflow-y-auto">
        <StdTabTitle title="Bookings" />
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
      </div>
    </div>
  );
}