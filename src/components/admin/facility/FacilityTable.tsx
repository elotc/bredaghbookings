"use client";

import { StdTabDelInlBtn, StdTabTh, StdTabTd, StdTabClass, StdTabUpdInlBtn, StdTabTitle, StdTabDupInlBtn, StdTabBtnBar, StdTabNavBtn, StdTabActionTd } from "@/components/general/StdTable";
import { Facility, FacilityList } from "@/data/definitions";
import { deleteFacilityAction, duplicateFacilityAction } from "@/lib/admin/FacilityActions";
import { Location } from "@/data/definitions";
import { useState } from "react";

export default function FacilityTable({ location, facilities }: { location: Location; facilities: FacilityList[] }) {
  const [error, setError] = useState<string | null>(null);
  return (
    <main className="max-w-4xl mx-auto py-8">
      <StdTabTitle title="Facilities" createPageLink={`/admin/locations/${location.id}/facilities/create`} error={error}/>
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
              <StdTabTd>{facility.name}</StdTabTd>
              <StdTabActionTd>
                <StdTabUpdInlBtn 
                  updatePageLink={`/admin/locations/${location.id}/facilities/${facility.id}/edit`} />
                <StdTabDupInlBtn 
                  id={facility.id} 
                  primaryId={location.id}
                  duplicateAction={duplicateFacilityAction} 
                  onError={(msg: string) => setError(msg)}/>
                <StdTabDelInlBtn 
                  id={facility.id} 
                  primaryId={location.id}
                  deleteAction={deleteFacilityAction} 
                  onError={(msg: string) => setError(msg)}/>
              </StdTabActionTd>
            </tr>
          ))}
        </tbody>
      </table>
      <StdTabBtnBar>
        <StdTabNavBtn ref="/admin/locations" label="Back" />
      </StdTabBtnBar>
    </main>
  );
}
