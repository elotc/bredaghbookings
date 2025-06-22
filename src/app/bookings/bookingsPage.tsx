'use client';

import { useState } from "react";
import { lusitana } from "@/components/general/fonts";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import StatusInfoModal from "@/components/bookings/statusInfoModal";
import { DropDownList, SelectDate } from "@/components/bookings/dropDownList";
import { InfoButton, SlotButton } from "@/components/bookings/buttons";

const locations = [
    { id: '1', name: 'Cherryvale' },
    { id: '2', name: 'Aquinas' },
    { id: '3', name: 'Wellington' },
];

const facilities = [
    { id: '1', name: 'CV1' },
    { id: '2', name: 'CV2' },
    { id: '3', name: '3G' },
];

const clubs = [
    { id: '1', name: 'Bredagh GAC', abbrev: 'BGAC' },
    { id: '2', name: 'St Malachys GAC', abbrev: 'MALA' },
];

const codes = [
    { id: '1', name: 'Hurling', abbrev: 'HURL' },
    { id: '2', name: 'Football', abbrev: 'FOOT' },
    { id: '3', name: 'Camogie', abbrev: 'CAMO' },
    { id: '4', name: 'Ladies Football', abbrev: 'LGFA' },
];

const teams = [
    { id: '1', name: 'U14H' },
    { id: '2', name: 'Senior' },
    { id: '3', name: 'Minors' },
];

export enum BookingType {
    TRAINING = "Training",
    MATCH = "Match",
    EVENT = "Event",
    OTHER = "Other",
};

export enum SlotStatus {
    BOOKED = "booked",
    REQUESTED = "requested",
    ENQUIRE = "enquire",
    CLOSED = "closed",
    FREE = "free",
};

const timeSlots = [
    { id: 1, displayTime: "17:00", part1: { status: SlotStatus.CLOSED, team: teams[0], displayTeamName: "" }, part2: { status: SlotStatus.CLOSED, team: teams[1], displayTeamName: "" } },
    { id: 2, displayTime: "17:30", part1: { status: SlotStatus.BOOKED, team: teams[0], displayTeamName: "BGAC/HURL/U14" }, part2: { status: SlotStatus.BOOKED, team: teams[1], displayTeamName: "BGAC/HURL/U14" } },
    { id: 3, displayTime: "18:00", part1: { status: SlotStatus.BOOKED, team: teams[0], displayTeamName: "BGAC/HURL/U14" }, part2: { status: SlotStatus.BOOKED, team: teams[1], displayTeamName: "BGAC/HURL/U14" } },
    { id: 4, displayTime: "18:30", part1: { status: SlotStatus.FREE, team: teams[0], displayTeamName: "" }, part2: { status: SlotStatus.FREE, team: teams[1], displayTeamName: "" } },
    { id: 5, displayTime: "19:00", part1: { status: SlotStatus.FREE, team: teams[0], displayTeamName: "" }, part2: { status: SlotStatus.FREE, team: teams[1], displayTeamName: "" } },
    { id: 6, displayTime: "19:30", part1: { status: SlotStatus.REQUESTED, team: teams[0], displayTeamName: "BGAC/LGFA/SEN" }, part2: { status: SlotStatus.REQUESTED, team: teams[1], displayTeamName: "MALA/FOOT/SEN" } },
    { id: 7, displayTime: "20:00", part1: { status: SlotStatus.FREE, team: teams[0], displayTeamName: "" }, part2: { status: SlotStatus.FREE, team: teams[1], displayTeamName: "" } },
    { id: 8, displayTime: "20:30", part1: { status: SlotStatus.ENQUIRE, team: teams[0], displayTeamName: "" }, part2: { status: SlotStatus.ENQUIRE, team: teams[1], displayTeamName: "" } },
];

// Helper function to get button color classes based on status
function getStatusClasses(status: SlotStatus, selected: boolean) {
    if (selected) return "border-2 border-black"; // highlight selected
    switch (status) {
        case SlotStatus.FREE:
            return "bg-green-500 text-white border-green-600";
        case SlotStatus.CLOSED:
            return "bg-gray-700 text-white border-gray-800";
        case SlotStatus.ENQUIRE:
            return "bg-green-200 text-gray-900 border-green-300";
        case SlotStatus.BOOKED:
            return "bg-red-500 text-white border-red-600";
        case SlotStatus.REQUESTED:
            return "bg-yellow-300 text-gray-900 border-yellow-400";
        default:
            return "bg-white text-gray-800 border-gray-300";
    }
}



export default function Bookings() {
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // yyyy-mm-dd
    });
    const [selectedLocation, setSelectedLocation] = useState("select");
    const [selectedFacility, setSelectedFacility] = useState("select");

    const [selectedClub, setSelectedClub] = useState(clubs[0].id);
    const [selectedCode, setSelectedCode] = useState(codes[0].id);
    const [selectedTeam, setSelectedTeam] = useState(teams[0].id);

    const [selectedBookingType, setSelectedBookingType] = useState(BookingType.TRAINING);

    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

    const [infoOpen, setInfoOpen] = useState(false);
    

    const toggleSlot = (slot: string) => {
        setSelectedSlots(prev =>
            prev.includes(slot)
                ? prev.filter(s => s !== slot)
                : [...prev, slot]
        );
    };

    return (
        <main>
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Bookings
            </h2>

            <form className="space-y-4 max-w-md">

                <div className="grid grid-cols-1 gap-1 md:grid-cols-3 ">
                    <SelectDate
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                    <DropDownList
                        label="Location"
                        selectedItem={selectedLocation}
                        setSelectedItem={setSelectedLocation}
                        itemList={locations}
                    />
                    <DropDownList
                        label="Facility"
                        selectedItem={selectedFacility}
                        setSelectedItem={setSelectedFacility}
                        itemList={facilities}
                    />
                </div>
                <hr className="mt-4 my-4 bg-[#003366]" />

                <div className="mt-4">
                    <span className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">
                            Time Slots - click on Green slots to book that time
                        </h3>
                        <InfoButton onClick={() => setInfoOpen(true)} />
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                        {/* Header row */}
                        <div className="flex items-center gap-4 font-semibold">
                            <span className="w-1/5">Time</span>
                            <span className="w-2/5 min-w-[120px] text-center">Half Pitch</span>
                            <span className="w-2/5 min-w-[120px] text-center">Half Pitch</span>
                        </div>
                        {timeSlots.map(slot => (
                            <div key={slot.id} className="flex items-center gap-4">
                                <span className="w-1/5">{slot.displayTime}</span>
                                <button
                                    type="button"
                                    onClick={() => toggleSlot(`${slot.id} - 1`)}
                                    disabled={
                                        [SlotStatus.CLOSED, SlotStatus.BOOKED, SlotStatus.REQUESTED].includes(slot.part1.status)
                                    }
                                    className={`w-2/5 min-w-[120px] py-1 px-3 rounded border text-sm flex items-center justify-center ${getStatusClasses(slot.part1.status, selectedSlots.includes(`${slot.id} - 1`))} ${[SlotStatus.CLOSED, SlotStatus.BOOKED, SlotStatus.REQUESTED].includes(slot.part1.status)
                                        ? "opacity-60 cursor-not-allowed"
                                        : ""
                                        }`}
                                >
                                    <span className="mx-auto">{slot.part1.displayTeamName || slot.part1.status}</span>
                                    {selectedSlots.includes(`${slot.id} - 1`) && (
                                        <span className="ml-2 text-sm" aria-label="selected">✔️</span>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toggleSlot(`${slot.id} - 2`)}
                                    disabled={
                                        [SlotStatus.CLOSED, SlotStatus.BOOKED, SlotStatus.REQUESTED].includes(slot.part2.status)
                                    }
                                    className={`w-2/5 min-w-[120px] py-1 px-3 rounded border text-sm flex items-center justify-center ${getStatusClasses(slot.part2.status, selectedSlots.includes(`${slot.id} - 2`))} ${[SlotStatus.CLOSED, SlotStatus.BOOKED, SlotStatus.REQUESTED].includes(slot.part2.status)
                                        ? "opacity-60 cursor-not-allowed"
                                        : ""
                                        }`}
                                >
                                    <span className="mx-auto">{slot.part2.displayTeamName || slot.part2.status}</span>
                                    {selectedSlots.includes(`${slot.id} - 2`) && (
                                        <span className="ml-2 text-sm" aria-label="selected">✔️</span>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>

                    <StatusInfoModal open={infoOpen} onClose={() => setInfoOpen(false)} />
                    {selectedSlots.length > 0 && (
                        <div className="mt-4 text-green-700">
                            Selected slots:{" "}
                            <strong>{selectedSlots.join(", ")}</strong>
                        </div>
                    )}
                </div>

                <hr className="mt-4 my-4 bg-[#003366]" />

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

                    <div>
                        <label htmlFor="bookingType" className="block text-sm font-medium text-gray-500">
                            Booking Type
                        </label>
                        <select
                            id="bookingType"
                            value={selectedBookingType}
                            onChange={e => setSelectedBookingType(e.target.value as BookingType)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            {Object.values(BookingType).map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors"
                        onClick={() => {
                            setSelectedSlots([]);
                            setSelectedLocation(locations[0].id);
                            setSelectedFacility(facilities[0].id);
                            setSelectedDate(new Date().toISOString().split("T")[0]); // Reset to today
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-[#FFD700] text-[#003366] font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-colors disabled:opacity-10 disabled:cursor-not-allowed"
                        disabled={selectedSlots.length === 0}
                        onClick={e => {
                            e.preventDefault();
                            // Add your submit logic here
                            alert("Booking submitted!");
                        }}
                    >
                        Submit
                    </button>
                </div>
            </form >
        </main >
    );
}