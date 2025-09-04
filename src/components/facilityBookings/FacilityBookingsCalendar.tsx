"use client";

import { useEffect, useState } from "react";
import { ControlPanel } from "@/components/bookings/ControlPanel";
import { buildTimeslots } from "@/lib/schedule/scheduleUtils";
import { DailySlots, FacilityBooking, FacilityList, ScheduleFacilityBlock } from "@/data/definitions";
import { StdFormButtonBar, StdFormCancelBtn } from "@/components/general/StdForm";
import CalendarView from "@/components/facilityBookings/CalendarView";
import { getOneWeekForwardFromDate, getTodaysDate } from "@/lib/schedule/dateTimeUtils";


export default function FacilityBookingsCalendar({ initialDate, blocks, bookings, facility }:
    {
        initialDate: Date,
        blocks: ScheduleFacilityBlock[];
        bookings: FacilityBooking[];
        facility: FacilityList;
    }) {

    console.log("FacilityBookingsCalendar: rendering for date", initialDate);

    const [focusDate, setFocusDate] = useState<Date>(initialDate);
    const [startHour, setStartHour] = useState<number>(18);
    const [endHour, setEndHour] = useState<number>(23);

    const startOfYear = new Date(initialDate.getFullYear(), 0, 1);
    const endOfYear = new Date(initialDate.getFullYear(), 11, 31);

    const timeslots = buildTimeslots(
        focusDate,
        getOneWeekForwardFromDate(focusDate),
        startHour,
        endHour,
        facility.slotDurationMins,
        blocks,
        bookings
    );

    return (
        <div>
            <div className={""}>
                <div className="grid grid-cols-1 gap-4 mb-8">
                    <ControlPanel
                        startHour={startHour} setStartHour={setStartHour}
                        endHour={endHour} setEndHour={setEndHour}
                        focusDate={focusDate} setFocusDate={setFocusDate}
                        startDate={startOfYear} endDate={endOfYear} />
                </div>
                <h1 className="text-lg font-semibold text-center">Bookings for: <strong>{facility.name}</strong></h1>
                <CalendarView
                    dailySlots={timeslots}
                />
                <StdFormButtonBar>
                    <StdFormCancelBtn backRef={`/facilityBookings`} label="Back"/>
                </StdFormButtonBar>
            </div>
        </div>
    );
}
