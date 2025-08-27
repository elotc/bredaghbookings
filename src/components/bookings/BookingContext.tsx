"use client";

import { createContext, useState } from "react";

// Add a type for selected slots with facility ID
export type SelectedSlot = {
    facilityId: number;
    slotId: number;
};

export const BookingContext = createContext<{
    pageTitles: string[];
    setPageTitles: (titles: string[]) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    requestorId: string | null;
    setRequestorId: (requestorId: string | null) => void;
    teamId: number;
    setTeamId: (teamId: number) => void;
    focusDate: Date;
    setFocusDate: (focusDate: Date) => void;
    startDate: Date;
    setStartDate: (startDate: Date) => void;
    endDate: Date;
    setEndDate: (endDate: Date) => void;
    facilities: number[];
    setFacilities: (facilities: number[]) => void;
    slots: SelectedSlot[];
    setSlots: (slots: SelectedSlot[]) => void;
}>({
    pageTitles: [],
    setPageTitles: () => { },
    currentPage: 0,
    setCurrentPage: () => { },
    requestorId: null,
    setRequestorId: () => { },
    teamId: -1,
    setTeamId: () => { },
    focusDate: new Date(),
    setFocusDate: () => { },
    startDate: new Date(),
    setStartDate: () => { },
    endDate: new Date(),
    setEndDate: () => { },
    facilities: [],
    setFacilities: () => { },
    slots: [],
    setSlots: () => { },
});

export function BookingContextProvider({ children }: { children: React.ReactNode }) {
    const [pageTitles, setPageTitles] = useState<string[]>(["Set Criteria", "Select Slots", "Submit Booking"]);
    const [currentPage, setCurrentPage] = useState(0);
    const [requestorId, setRequestorId] = useState<string | null>(null);
    const [teamId, setTeamId] = useState<number>(-1);
    const [focusDate, setFocusDate] = useState<Date>(new Date());
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    const [facilities, setFacilities] = useState<number[]>([]);
    const [slots, setSlots] = useState<SelectedSlot[]>([]);

    return (
        <BookingContext.Provider value={{
            pageTitles,
            setPageTitles,
            currentPage,
            setCurrentPage,
            requestorId,
            setRequestorId,
            teamId,
            setTeamId,
            focusDate,
            setFocusDate,
            startDate,
            setStartDate,
            endDate,
            setEndDate,
            facilities,
            setFacilities,
            slots,
            setSlots,
        }}>
            {children}
        </BookingContext.Provider>
    )
}
