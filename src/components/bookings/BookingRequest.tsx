"use client";

import { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import SectionNavBtn from "./SectionNavBtn";
import SectionPage from "./SectionPage";
import { StdFormDivider, StdFormInput, StdFormSelect } from "../general/StdForm";
import { UserOrgContext } from "@/components/auth/UserOrgContext";
import { ClubGroupingTeam } from "@/data/definitions";
import { getEndOfWeek, getStartOfWeek } from "@/lib/schedule/dateTimeUtils";
import DailySlotsView from "../admin/schedule/DailySlotsView";
import { buildTimeslots } from "@/lib/schedule/scheduleUtils";
import { ControlPanel } from "./ControlPanel";



export default function BookingRequest({ teams, blocks }: { teams: ClubGroupingTeam[]; blocks: any[] }) {
    const { thisUserOrg, userOrgs } = useContext(UserOrgContext);
    const [currentPage, setCurrentPage] = useState(1);
    const pageTitles = ["Select", "Reserve", "Submit"];

    useEffect(() => {
        console.log("BookingRequest: thisUserOrg", thisUserOrg, userOrgs);
    }, [thisUserOrg, userOrgs]);

    const [clubId, setClubId] = useState<string | number>(-1);
    const [groupingId, setGroupingId] = useState<string | number>(-1);
    const [teamId, setTeamId] = useState<string | number>(-1);

    let clubOptions = [
        { value: -1, label: "Select club..." },
        ...Array.from(
            new Map(
                teams
                    .filter(team => team.clubId && team.clubName)
                    .map(team => [team.clubId, { value: team.clubId, label: String(team.clubName) }])
            ).values()
        ),
    ];
    let groupingOptions = [
        { value: -1, label: "Select grouping..." },
        ...Array.from(
            new Map(
                teams
                    .filter(team => team.clubId == clubId)
                    .map(team => [team.groupingId, { value: team.groupingId, label: String(team.groupingName) }])
            ).values()
        ),
    ];
    let teamOptions = [
        { value: -1, label: "Select team..." },
        ...Array.from(
            new Map(
                teams
                    .filter(team => team.groupingId == groupingId)
                    .map(team => [team.teamId, { value: team.teamId, label: String(team.teamName) }])
            ).values()
        ),
    ];

    function setClubAndReset(selectedClubId: string | number) {
        setClubId(selectedClubId);
        setGroupingId(-1);
        setTeamId(-1);
    }

    const today = new Date();
    const [startDate, setStartDate] = useState<Date>(today);
    const [endDate, setEndDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()));
    const [focusDate, setFocusDate] = useState<Date>(today);

    function handleDateChange(date: string, isStart: boolean) {
        const parsedDate = new Date(date);
        if (isStart) {
            setStartDate(parsedDate);
        } else {
            setEndDate(parsedDate);
        }
    }

    const [startHour, setStartHour] = useState<number>(18);
    const [endHour, setEndHour] = useState<number>(startHour + 5);
    

    const timeslots = buildTimeslots(
        new Date(startDate),
        new Date(endDate),
        startHour,
        endHour,
        30,
        blocks,
        []
    );

    return (
        <div>
            <SectionPage thisPage={1} currentPage={currentPage} pageTitles={pageTitles}
                bodyContent={
                    <>
                        <StdFormDivider text="Select Team" />
                        <div className="grid grid-cols-1 XXmd:grid-cols-3 gap-4">
                            <StdFormSelect
                                name="club"
                                label="Club"
                                onChange={setClubAndReset}
                                options={clubOptions}
                                defaultValue={clubId != -1 ? clubId : (clubOptions.length == 2 ? clubOptions[1].value : "")}
                                readOnly={clubOptions.length <= 2}
                            />
                            <StdFormSelect
                                name="grouping"
                                label="Code"
                                onChange={setGroupingId}
                                options={groupingOptions}
                                defaultValue={groupingId != -1 ? groupingId : (groupingOptions.length == 2 ? groupingOptions[1].value : "")}
                                readOnly={groupingOptions.length <= 2}
                            />
                            <StdFormSelect
                                name="teams"
                                label="Team"
                                onChange={setTeamId}
                                options={teamOptions}
                                defaultValue={teamId != -1 ? teamId : (teamOptions.length == 2 ? teamOptions[1].value : "")}
                                readOnly={teamOptions.length <= 2}
                            />
                        </div>
                        <StdFormDivider text="Select Date Range" />
                        <div className="grid grid-cols-1 XXmd:grid-cols-2 gap-4">
                            <StdFormInput
                                name="start_date"
                                label="Start Date"
                                type="date"
                                defaultValue={focusDate.toISOString().split("T")[0]}
                                onChange={date => handleDateChange(date, true)}
                            />
                            <StdFormInput
                                name="end_date"
                                label="End Date"
                                type="date"
                                defaultValue={endDate.toISOString().split("T")[0]}
                                onChange={date => handleDateChange(date, false)}
                            />
                            <StdFormInput
                                name="start_hour"
                                label="Ideal Start Hour"
                                type="number"
                                range={{ min: 0, max: 24 }}
                                defaultValue={String(startHour)}
                                onChange={v => setStartHour(Number(v))}
                            />
                        </div>
                    </>
                }
                footerContent={
                    <>
                        <SectionNavBtn label="Cancel" onClick={() => redirect("/home")} />
                        <SectionNavBtn label="Next" onClick={() => setCurrentPage(2)} />
                    </>
                }
            />

            <SectionPage thisPage={2} currentPage={currentPage} pageTitles={pageTitles}
                bodyContent={
                    <div>

                        <ControlPanel 
                            startHour={startHour} setStartHour={setStartHour} 
                            endHour={endHour} setEndHour={setEndHour} 
                            startDate={startDate} setStartDate={setStartDate} 
                            endDate={endDate} setEndDate={setEndDate} />
                        
                        <DailySlotsView dailySlots={timeslots} />
                    </div>
                }
                footerContent={
                    <>
                        <SectionNavBtn label="Prev" onClick={() => setCurrentPage(1)} />
                        <SectionNavBtn label="Next" onClick={() => setCurrentPage(3)} />
                    </>
                }
            />

            <SectionPage thisPage={3} currentPage={currentPage} pageTitles={pageTitles}
                bodyContent={
                    <p>Your booking request has been submitted!</p>
                }
                footerContent={
                    <>
                        <SectionNavBtn label="Prev" onClick={() => setCurrentPage(2)} />
                        <SectionNavBtn label="OK" onClick={() => alert("Booking request submitted!")} />
                    </>
                }
            />
        </div>
    );
}
