"use client";

import { StdTabDelInlBtn, StdTabTh, StdTabTd, StdTabClass, StdTabUpdInlBtn, StdTabTitle, StdTabDupInlBtn, StdTabNavInlBtn, StdTabError, StdTabActionTd } from "@/components/general/StdTable";
import { BookingRequest, CountsType } from "@/data/definitions";
import { deleteBookingRequestAction, duplicateBookingRequestAction } from "@/lib/bookings/BookingRequestActions";
import { useState } from "react";

export default function BookingTable({ bookings, bookingCounts, commentCounts }: 
  { bookings: BookingRequest[], bookingCounts: CountsType[], commentCounts: CountsType[] }) {
  const [error, setError] = useState<string | null>(null);
  return (
    <main className="max-w-4xl mx-auto py-8">
      <StdTabTitle title="Bookings" createPageLink="/bookings/create" error={error}/>
      <table className={StdTabClass}>
        <thead>
          <tr>
            <StdTabTh>Abbrev</StdTabTh>
            <StdTabTh>Description</StdTabTh>
            <StdTabTh>Status</StdTabTh>
            <StdTabTh>Type</StdTabTh>
            <StdTabTh>Requestor</StdTabTh>
            <StdTabTh>Approver</StdTabTh>
            <StdTabTh>Actions</StdTabTh>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.bookingId}>
              <StdTabTd>{booking.bookingAbbrev || "N/A"}</StdTabTd>
              <StdTabTd>{booking.description || "N/A"}</StdTabTd>
              <StdTabTd>{booking.status}</StdTabTd>
              <StdTabTd>{booking.eventType}</StdTabTd>
              <StdTabTd>{booking.requestorId}</StdTabTd>
              <StdTabTd>{booking.approverId || "N/A"}</StdTabTd>
              <StdTabActionTd>
                <StdTabNavInlBtn
                  actionName="Slots"
                  actionPageLink={`/bookings/${booking.bookingId}/slots`}
                  count={bookingCounts.find(bc => bc.id === booking.bookingId)?.count || 0} />
                <StdTabNavInlBtn
                  actionName="Comments"
                  actionPageLink={`/bookings/${booking.bookingId}/comments`}
                  count={commentCounts.find(cc => cc.id === booking.bookingId)?.count || 0} />
                <StdTabUpdInlBtn updatePageLink={`/bookings/${booking.bookingId}/edit`} />
                <StdTabDupInlBtn
                  id={booking.bookingId}
                  duplicateAction={duplicateBookingRequestAction}
                  onError={(msg: string) => setError(msg)}
                />
                <StdTabDelInlBtn
                  id={booking.bookingId}
                  deleteAction={deleteBookingRequestAction}
                  onError={(msg: string) => setError(msg)}
                />
              </StdTabActionTd>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}