"use client";

import { StdTabTh, StdTabTd, StdTabClass, StdTabTitle, StdTabBtnBar, StdTabNavBtn, StdTabActionTd, StdTabCalInlBtn, StdTabBkgInlBtn } from "@/components/general/StdTable";
import { FacilityList } from "@/data/definitions";

export default function FacilityBookingsTable({ facilities }: { facilities: FacilityList[] }) {
  return (
    <main className="max-w-4xl mx-auto py-8">
      <StdTabTitle title="Facility Bookings" />
      <table className={StdTabClass}>
        <thead>
          <tr>
            <StdTabTh>Name</StdTabTh>
            <StdTabTh>Actions</StdTabTh>
          </tr>
        </thead>
        <tbody>
          {facilities.map(facility => (
            <tr key={facility.id}>
              <StdTabTd>{facility.locationName} / {facility.name}</StdTabTd>
              <StdTabActionTd>
                <StdTabCalInlBtn pageLink={`/facilityBookings/${facility.id}/calendar`} />
                <StdTabBkgInlBtn pageLink={`/facilityBookings/${facility.id}/bookings`} />
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
