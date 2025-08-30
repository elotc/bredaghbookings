"use client";

import { useContext, useEffect, useState, useActionState, use } from "react";
import { StdForm, StdFormButtonBar, StdFormCancelBtn, StdFormDivider, StdFormError, StdFormHidden, StdFormInput, StdFormSelect, StdFormSubmitBtn } from "../general/StdForm";
import { UserOrgContext } from "@/components/auth/UserOrgContext";
import { ClubGroupingTeam, FacilityList } from "@/data/definitions";
import { BookingContext } from "@/components/bookings/BookingContext";
import { bookingCriteriaAction } from "@/lib/bookings/BookingRequestActions";
import { redirect } from "next/navigation";
import SectionHeader from "./SectionHeader";


export default function BookingCriteria({ teams, allFacilities }: { teams: ClubGroupingTeam[]; allFacilities: FacilityList[]; }) {
    const { thisUserOrg } = useContext(UserOrgContext);
    const {
        setRequestorId, teamId, setTeamId, setFullTeamName,
        groupingId, setGroupingId, clubId, setClubId,
        startDate, setStartDate, endDate, setEndDate,
        facilities, setFacilities
    } = useContext(BookingContext);

    useEffect(() => {
        if (!thisUserOrg) {
            console.error("No user org context found, redirecting to sign-in.");
            redirect("/role/role-error");
        }
        setRequestorId(thisUserOrg.userId);
    }, [thisUserOrg, setRequestorId]);

    const [facilitiesLoading, setFacilitiesLoading] = useState<boolean>(false);

    const [clubOptions, setClubOptions] = useState<any[]>([]);
    const [groupingOptions, setGroupingOptions] = useState<any[]>([]);
    const [teamOptions, setTeamOptions] = useState<any[]>([]);

    if (!teams || teams.length === 0) {
        return <div className="text-red-500">No teams available for booking.</div>;
    }

    useEffect(() => {
        if (teams.length === 1) {
            setClubOptions([{ value: -1, label: "..." }, { value: teams[0].clubId, label: String(teams[0].clubName) }]);
            setGroupingOptions([{ value: -1, label: "..." }, { value: teams[0].groupingId, label: String(teams[0].groupingName) }]);
            setTeamOptions([{ value: -1, label: "..." }, { value: teams[0].teamId, label: String(teams[0].teamName) }]);
            setClubId(teams[0].clubId);
            setGroupingId(teams[0].groupingId);
            setTeamId(teams[0].teamId);
            setFullTeamName(teams[0].clubName + "/" + (teams[0].groupingName + "/" + teams[0].teamName || ""));
        } else {
            console.log("Setting club, grouping, and team options based on teams data:", teams);
            setClubOptions([
                { value: -1, label: "Select club..." },
                ...Array.from(
                    new Map(
                        teams
                            .map(team => [team.clubId, { value: String(team.clubId), label: String(team.clubName) }])
                    ).values()
                ),
            ]);
            if( clubOptions.length === 2 ) {
                setClubId(clubOptions[1].value);
            }
            setGroupingOptions([
                { value: -1, label: "Select grouping..." },
                ...Array.from(
                    new Map(
                        teams
                            .filter(team => team.clubId == clubId)
                            .map(team => [team.groupingId, { value: String(team.groupingId), label: String(team.groupingName) }])
                    ).values()
                ),
            ]);
            if( groupingOptions.length === 2 ) {
                setGroupingId(groupingOptions[1].value);
            }
            setTeamOptions([
                { value: -1, label: "Select team..." },
                ...Array.from(
                    new Map(
                        teams
                            .filter(team => team.groupingId == groupingId)
                            .map(team => [team.teamId, { value: String(team.teamId), label: String(team.teamName) }])
                    ).values()
                ),
            ]);
            if( teamOptions.length === 2 ) {
                setTeamId(teamOptions[1].value);
            }
            console.log("Club, Grouping, and Team options set:", { clubOptions, groupingOptions, teamOptions });
        }
    }, [teams, clubId, groupingId, teamId, setClubId, setGroupingId, setTeamId, setClubOptions, setGroupingOptions, setTeamOptions]);

    function setClubAndReset(selectedClubId: number) {
        setClubId(selectedClubId);
        setGroupingId(-1);
        setTeamId(-1);
    }

    function setTeam(selectedTeamId: number) {
        console.log("Setting team ID to:", selectedTeamId);
        setTeamId(selectedTeamId);
        const selectedTeam = teams.find(team => team.teamId === selectedTeamId);
        setFullTeamName(selectedTeam?.clubName + "/" + (selectedTeam?.groupingName + "/" + selectedTeam?.teamName || ""));
        console.log("Selected team:", selectedTeam, setFullTeamName);
    }

    useEffect(() => {
        const today = new Date();
        setStartDate(today);
        setEndDate(new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()));
    }, [setStartDate, setEndDate]);

    function handleDateChange(date: string, isStart: boolean) {
        const parsedDate = new Date(date);
        if (isStart) {
            setStartDate(parsedDate);
        } else {
            setEndDate(parsedDate);
        }
    }

    function toggleFacility(selFac: string) {
        setFacilitiesLoading(true);
        const selFacNum = Number(selFac);
        if (facilities.includes(selFacNum)) {
            setFacilities(facilities.filter(id => id !== selFacNum));
        } else {
            setFacilities([...facilities, selFacNum]);
        }
        setFacilitiesLoading(false);
    }

    const [formState, formAction] = useActionState(bookingCriteriaAction, { error: "" });

    return (
        <div>
            <SectionHeader thisPageNumber={1} />
            <StdForm title={"Make a Booking"} action={formAction}>
                {formState.error && (<StdFormError error={formState.error} />)}
                <StdFormHidden name="userId" defaultValue={thisUserOrg?.userId || "unset"} />

                <StdFormDivider text="Select Team" />
                <div className="grid grid-cols-1 XXmd:grid-cols-3 gap-4">
                    <StdFormSelect
                        name="clubId"
                        label="Club"
                        onChange={value => setClubAndReset(Number(value))}
                        options={clubOptions}
                        defaultValue={clubId}
                        readOnly={false}
                    />
                    <StdFormSelect
                        name="groupingId"
                        label="Code"
                        onChange={value => setGroupingId(Number(value))}
                        options={groupingOptions}
                        defaultValue={groupingId}
                        readOnly={false}
                    />
                    <StdFormSelect
                        name="teamId"
                        label="Team"
                        onChange={value => setTeam(Number(value))}
                        options={teamOptions}
                        defaultValue={teamId}
                        readOnly={false}
                    />
                </div>
                <StdFormDivider text="Select date range for your booking" />
                <div className="grid grid-cols-2 gap-4">
                    <StdFormInput
                        name="startDate"
                        label="Start Date"
                        type="date"
                        defaultValue={startDate?.toISOString().split("T")[0]}
                        onChange={date => handleDateChange(date, true)}
                    />
                    <StdFormInput
                        name="endDate"
                        label="End Date"
                        type="date"
                        defaultValue={endDate?.toISOString().split("T")[0]}
                        onChange={date => handleDateChange(date, false)}
                    />
                </div>
                <StdFormDivider text="Select all facilities suitable for this booking" />
                <div>
                    <select
                        id="facilities"
                        name="facilities"
                        onChange={e => toggleFacility(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        value={facilities.map(String)}
                        multiple
                        size={4}
                        required
                        disabled={facilitiesLoading}
                    >
                        {allFacilities.map(facility => (
                            <option
                                key={facility.id}
                                value={facility.id}
                            >
                                {facility.locationName} / {facility.name}
                            </option>
                        ))}
                    </select>
                </div>
                <StdFormButtonBar>
                    <StdFormCancelBtn backRef={`/home`} />
                    <StdFormSubmitBtn disabled={teamId == -1 || facilities.length === 0} > {"Next"} </StdFormSubmitBtn>
                </StdFormButtonBar>
            </StdForm>
        </div>
    );
}
