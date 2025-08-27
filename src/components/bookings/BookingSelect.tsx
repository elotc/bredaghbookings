"use client";

import { useContext, useEffect, useState } from "react";
import DailySlotsView from "@/components/admin/schedule/DailySlotsView";
import { ControlPanel } from "@/components/bookings/ControlPanel";
import { buildTimeslots } from "@/lib/schedule/scheduleUtils";
import { BookingContext } from "@/components/bookings/BookingContext";
import SectionHeader from "./SectionHeader";
import { FacilityBooking, FacilityList, ScheduleFacilityBlock } from "@/data/definitions";
import { SelectFacility } from "./SelectFacility";
import { StdFormButtonBar, StdFormCancelBtn, StdFormClickBtn, StdFormSubmitBtn } from "../general/StdForm";
import { UserOrgContext } from "../auth/UserOrgContext";
import { redirect } from "next/navigation";

export default function BookingSelect({ blocks, bookings, facilities }:
    { 
        blocks: ScheduleFacilityBlock[]; 
        bookings: FacilityBooking[]; 
        facilities: FacilityList[]; 
    }) {

    console.log("BookingSelect component initialized with blocks:", blocks, "and bookings:", bookings);
    const { startDate, endDate, focusDate, setFocusDate, slots, setSlots } = useContext(BookingContext);
    const { thisUserOrg } = useContext(UserOrgContext);

    if (!thisUserOrg) { redirect("/auth/sign-in"); }

    const [startHour, setStartHour] = useState<number>(18);
    const [endHour, setEndHour] = useState<number>(startHour + 5);

    const [selectedFacilityId, setSelectedFacilityId] = useState<number>(-1);

    useEffect(() => { setFocusDate(startDate); }, [startDate, setFocusDate]);

    useEffect(() => {
        if (facilities.length > 0 && selectedFacilityId === -1) {
            setSelectedFacilityId(facilities[0].id);
        }
    }, [facilities, selectedFacilityId]);

    const slotDurationMins = facilities.find(facility => facility.id === selectedFacilityId)?.slotDurationMins || 30;

    const timeslots = buildTimeslots(
        focusDate,
        new Date(focusDate.getTime() + 24 * 60 * 60 * 1000),
        startHour,
        endHour,
        slotDurationMins,
        blocks.filter(block => block.facilityId === selectedFacilityId),
        bookings.filter(booking => booking.facilityId === selectedFacilityId)
    );

    const [ hideSelectPage, setHideSelectPage ] = useState<boolean>(false);
    const [ hideConfirmPage, setHideConfirmPage ] = useState<boolean>(true);

    function togglePages() {
        setHideSelectPage(!hideSelectPage);
        setHideConfirmPage(!hideConfirmPage);
    }

    return (
        <div>
            <div className={`${hideSelectPage ? "hidden" : ""}`}>
                <SectionHeader thisPageNumber={2} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ControlPanel
                        startHour={startHour} setStartHour={setStartHour}
                        endHour={endHour} setEndHour={setEndHour}
                        focusDate={focusDate} setFocusDate={setFocusDate}
                        startDate={startDate} endDate={endDate} />

                    <SelectFacility
                        facilities={facilities}
                        selectedFacility={selectedFacilityId}
                        setSelectedFacility={setSelectedFacilityId}
                    />
                </div>
                <DailySlotsView 
                    dailySlots={timeslots} 
                    slots={slots} 
                    setSlots={setSlots}
                    facilityId={selectedFacilityId}
                />
                <StdFormButtonBar>
                    <StdFormCancelBtn backRef={`/bookings/${thisUserOrg.userId}`} />
                    <StdFormClickBtn onClick={togglePages} disabled={slots.length === 0} label={"Next"} />
                </StdFormButtonBar>
            </div>
            <div className={`${hideConfirmPage ? "hidden" : ""}`}>
                <SectionHeader thisPageNumber={3} />
                <div>
                    <h3>Selected Slots</h3>
                    <ul>
                        {slots.map((slot, idx) => (
                            <li key={idx}>
                                {facilities.find(facility => facility.id === slot.facilityId)?.name}: 
                                {new Date(slot.slotId).toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' })}{" "}
                                {new Date(slot.slotId).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </li>
                        ))}
                    </ul>
                </div>
                <StdFormButtonBar>
                    <StdFormClickBtn onClick={togglePages} label={"Back"} />
                    <StdFormSubmitBtn disabled={slots.length === 0} > {"Next"} </StdFormSubmitBtn>
                </StdFormButtonBar>
            </div>
        </div>
    );
}
