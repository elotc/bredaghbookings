"use client";

import { StdTabDelInlBtn, StdTabTh, StdTabTd, StdTabClass, StdTabUpdInlBtn, StdTabTitle, StdTabDupInlBtn, StdTabNavInlBtn, StdTabError, StdTabActionTd } from "@/components/general/StdTable";
import { LocationList, CountsType } from "@/data/definitions";
import { deleteLocationAction, duplicateLocationAction } from "@/lib/admin/LocationActions";
import { useState } from "react";

export default function LocationTable({ locations, facilityCounts }: 
  { locations: LocationList[], facilityCounts: CountsType[] }) {
  const [error, setError] = useState<string | null>(null);
  return (
    <main className="max-w-4xl mx-auto py-8">
      <StdTabTitle title="Locations" createPageLink="/admin/locations/create" error={error}/>
      <table className={StdTabClass}>
        <thead>
          <tr>
            <StdTabTh>Name</StdTabTh> 
            <StdTabTh>Actions</StdTabTh>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location.id}>
              <StdTabTd>{location.name}</StdTabTd>
              <StdTabActionTd>
                <StdTabNavInlBtn
                  actionName="Facilities"
                  actionPageLink={`/admin/locations/${location.id}/facilities`}
                  count={facilityCounts.find(fc => fc.id === location.id)?.count || 0} />
                <StdTabUpdInlBtn updatePageLink={`/admin/locations/${location.id}/edit`} />
                <StdTabDupInlBtn 
                  id={location.id} 
                  duplicateAction={duplicateLocationAction} 
                  onError={(msg: string) => setError(msg)} 
                />
                <StdTabDelInlBtn 
                  id={location.id} 
                  deleteAction={deleteLocationAction} 
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