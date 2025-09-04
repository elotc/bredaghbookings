"use client";

import { useState } from "react";
import { CountsType, OrgList, OrgType } from "@/data/definitions";
import OrgTable from "@/components/admin/org/OrgTable";
import { StdMsgNote } from "@/components/general/StdMessage";

export default function ClubGroupingTeamSelector({ orgs, userCounts }
    : { orgs: OrgList[], userCounts: CountsType[] }) {

    const [selectedClubId, setSelectedClubId] = useState({ id: -1, name: "" });
    const [selectedGroupingId, setSelectedGroupingId] = useState({ id: -1, name: "" });
    const [selectedTeamId, setSelectedTeamId] = useState({ id: -1, name: "" });

    function handleClubChange({ id, name }: { id: number, name: string }) {
        setSelectedClubId({ id, name });
        setSelectedGroupingId({ id: -1, name: "" });
        setSelectedTeamId({ id: -1, name: "" });
    }

    function handleGroupingChange({ id, name }: { id: number, name: string }) {
        setSelectedGroupingId({ id, name });
        setSelectedTeamId({ id: -1, name: "" });
    }

    return (
        <div>
            <StdMsgNote text="Click on organisation name to select" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-1">
                <div>
                    <OrgTable
                        displayOrgType={OrgType.CLUB}
                        orgs={orgs.filter(org => org.type === "Club")}
                        userCounts={userCounts}
                        setSelectedId={handleClubChange}
                        selectedId={selectedClubId}
                        clubId={{ id: -1, name: "" }}
                        groupingId={{ id: -1, name: "" }}
                    />
                </div>
                <div>
                    <OrgTable
                        displayOrgType={OrgType.GROUPING}
                        orgs={orgs.filter(org => org.type === "Grouping")}
                        userCounts={userCounts}
                        setSelectedId={handleGroupingChange}
                        selectedId={selectedGroupingId}
                        clubId={selectedClubId}
                        groupingId={{ id: -1, name: "" }}
                    />
                </div>
                <div>
                    <OrgTable
                        displayOrgType={OrgType.TEAM}
                        orgs={orgs.filter(org => org.type === "Team")}
                        userCounts={userCounts}
                        setSelectedId={setSelectedTeamId}
                        selectedId={selectedTeamId}
                        clubId={selectedClubId}
                        groupingId={selectedGroupingId}
                    />
                </div>
            </div>
        </div>
    );
}
