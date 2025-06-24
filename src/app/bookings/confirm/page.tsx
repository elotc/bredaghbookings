"use client";

import BookingCommentBox from "@/components/bookings/BookingCommentBox";
import BookingTypeSelect from "@/components/bookings/BookingTypeSelect";
import { DropDownList } from "@/components/bookings/IdStringDropDown";
import { BookingType } from "@/data/bookings/definitions";
import { clubs, codes, teams, facilities, timeSlots } from "@/data/bookings/testdata";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";


export default function Bookings() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const slots = searchParams.get("slots")?.split(",") ?? [];
    const date = searchParams.get("date");
    const facility = searchParams.get("facility");

    // Find the facility name by id
    const facilityName = facilities.find(f => f.id === facility)?.name || facility;

    // Helper to get displayTime for a slot string like "3 - 1"
    const getDisplayTime = (slotStr: string) => {
        const slotId = slotStr.split(" - ")[0];
        const slot = timeSlots.find(ts => String(ts.id) === slotId);
        return slot ? slot.displayTime : slotStr;
    };

    const [selectedClub, setSelectedClub] = useState(clubs[0].id);
    const [selectedCode, setSelectedCode] = useState(codes[0].id);
    const [selectedTeam, setSelectedTeam] = useState(teams[0].id);
    const [selectedBookingType, setSelectedBookingType] = useState(BookingType.TRAINING);
    const [comment, setComment] = useState("");

    return (
        <main>
            <h2 className="mb-4 text-xl md:text-2xl">Confirm Booking</h2>

            <form className="space-y-4 max-w-md">
                <div>
                    <strong>Selected Slots for {facilityName} on {date}:</strong>
                    <ul>
                        {slots.map(slot => (
                            <li key={slot}>
                                {getDisplayTime(slot)} ({slot})
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="grid grid-cols-1 gap-1 md:grid-cols-4 mt-4">
                    <DropDownList
                        label="Club"
                        selectedItem={selectedClub}
                        setSelectedItem={setSelectedClub}
                        itemList={clubs}
                    />
                    <DropDownList
                        label="Code"
                        selectedItem={selectedCode}
                        setSelectedItem={setSelectedCode}
                        itemList={codes}
                    />
                    <DropDownList
                        label="Team"
                        selectedItem={selectedTeam}
                        setSelectedItem={setSelectedTeam}
                        itemList={teams}
                    />

                    <BookingTypeSelect
                        selectedBookingType={selectedBookingType}
                        setSelectedBookingType={setSelectedBookingType}
                    />
                </div>
                <div className="grid grid-cols-1 gap-1">
                    <BookingCommentBox
                        comment={comment}
                        setComment={setComment}
                    />
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors"
                        onClick={() => router.push("/bookings")}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-[#FFD700] text-[#003366] font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-colors"
                        onClick={e => {
                            e.preventDefault();
                            // Add your submit logic here
                            alert("Booking confirmed!");
                        }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </main>
    );
}

