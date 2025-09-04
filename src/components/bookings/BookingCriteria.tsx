"use client";

import { useContext, useEffect, useState, useActionState } from "react";
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
        setClubId, setGroupingId,
        startDate, setStartDate, endDate, setEndDate,
        facilities, setFacilities
    } = useContext(BookingContext);

    useEffect(() => {
        if (!thisUserOrg) {
            console.error("No user org context found, redirecting to sign-in.");
            redirect("/auth/sign-in");
        }
        setRequestorId(thisUserOrg.userId);
    }, [thisUserOrg, setRequestorId]);

    const [facilitiesLoading, setFacilitiesLoading] = useState<boolean>(false);

    useEffect(() => {
        const today = new Date();
        setStartDate(today);
        setEndDate(new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()));
    }, [setStartDate, setEndDate]);

    function setTeam(selectedTeamId: number) {
        setTeamId(selectedTeamId);
        const selectedTeam = teams.find(team => team.teamId === selectedTeamId);
        setFullTeamName(selectedTeam?.clubName + "/" + selectedTeam?.groupingName + "/" + selectedTeam?.teamName );
        setClubId(selectedTeam?.clubId || -1);
        setGroupingId(selectedTeam?.groupingId || -1);
    }

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
                <StdFormHidden name="orgId" defaultValue={thisUserOrg?.orgId || "unset"} />

                <StdFormDivider text="Select Team" />
                <div className="grid grid-cols-1 XXmd:grid-cols-3 gap-4">
                    <StdFormSelect
                        name="teamId"
                        label="Team"
                        onChange={value => setTeam(Number(value))}
                        options={[
                            { value: -1, label: "Select team..." },
                            ...teams.map(team => ({ value: team.teamId, label: team.clubName + "/" + team.groupingName + "/" + team.teamName }))
                        ]}
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
                                key={`Facility-${facility.id}`}
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
