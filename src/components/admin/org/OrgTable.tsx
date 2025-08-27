import { StdTabDelInlBtn, StdTabTh, StdTabTd, StdTabClass, StdTabUpdInlBtn, StdTabTitle, StdTabAddBtn, StdTabDupInlBtn, StdTabNavInlBtn, StdTabBtnBar, StdTabNavBtn, StdTabClickTd, StdTabError, StdTabActionTd } from "@/components/general/StdTable";
import { OrgList, OrgType, CountsType } from "@/data/definitions";
import { deleteOrgAction, duplicateOrgAction } from "@/lib/admin/OrgActions";
import { useState } from "react";

export default function OrgTable({ displayOrgType, orgs, userCounts, setSelectedId, selectedId, clubId, groupingId }:
  {
    displayOrgType: OrgType,
    orgs: OrgList[],
    userCounts: CountsType[],
    setSelectedId: ({ id, name }: { id: number, name: string }) => void,
    selectedId: { id: number, name: string },
    clubId: { id: number, name: string },
    groupingId: { id: number, name: string },
  }) {

  const [error, setError] = useState<string | null>(null);
  const linkUrl =
    displayOrgType === OrgType.GROUPING ? `/admin/orgs/create/groupings?clubId=${clubId.id}&clubName=${clubId.name}`
      : displayOrgType === OrgType.TEAM ? `/admin/orgs/create/teams?clubId=${clubId.id}&clubName=${clubId.name}&groupingId=${groupingId.id}&groupingName=${groupingId.name}`
        : `/admin/orgs/create/clubs`;

  return (
    <main className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">{displayOrgType}</h1>
        {(displayOrgType === OrgType.CLUB ||
          (displayOrgType === OrgType.GROUPING && clubId.id >= 0) ||
          (displayOrgType === OrgType.TEAM && (clubId.id >= 0 && groupingId.id >= 0)))
          && <StdTabAddBtn createPageLink={linkUrl} />}
      </div>
      {error && <StdTabError error={error} />}
      <table className={StdTabClass}>
        <thead>
          <tr>
            <StdTabTh>Name</StdTabTh>
            <StdTabTh>Actions</StdTabTh>
          </tr>
        </thead>
        <tbody>
          {orgs
            .filter(org =>
            (
              (org.type === OrgType.CLUB)
              || (org.type === OrgType.GROUPING && org.clubId === clubId.id)
              || (org.type === OrgType.TEAM && org.groupingId === groupingId.id)
            )
            )
            .map(org => (
              <tr key={org.id} >
                <StdTabClickTd
                  onClick={() => (setSelectedId({ id: org.id, name: org.name }))}
                  className={`${org.id === selectedId.id ? " bg-blue-200" : ""}`}>
                  {org.name}
                </StdTabClickTd>
                <StdTabActionTd>
                  <StdTabNavInlBtn
                    actionName="Users"
                    actionPageLink={`/admin/orgs/${org.id}/users`}
                    count={userCounts.find(uc => uc.id === org.id)?.count || 0}
                  />
                  <StdTabUpdInlBtn updatePageLink={`/admin/orgs/${org.id}/edit`} />
                  <StdTabDupInlBtn
                    id={org.id}
                    duplicateAction={duplicateOrgAction}
                    onError={(msg: string) => setError(msg)}
                  />
                  <StdTabDelInlBtn
                    id={org.id}
                    deleteAction={deleteOrgAction}
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