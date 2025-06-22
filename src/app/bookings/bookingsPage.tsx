'use client';

import { useState } from "react";
import { lusitana } from "@/components/general/fonts";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import StatusInfoModal from "@/components/bookings/statusInfoModal";

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

const teams = [
    { id: '1', name: 'U14H' },
    { id: '2', name: 'Senior' },
    { id: '3', name: 'Minors' },
];

export enum SlotStatus {
    BOOKED = "booked",
    REQUESTED = "requested",
    ENQUIRE = "enquire",
    CLOSED = "closed",
    FREE = "free",
}

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
    const [selectedLocation, setSelectedLocation] = useState(locations[0].id);
    const [selectedFacility, setSelectedFacility] = useState(facilities[0].id);
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    const [infoOpen, setInfoOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // yyyy-mm-dd
    });

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
                <div className="">

                    <div className="grid grid-cols-1 gap-1 md:grid-cols-3 ">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-500">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                value={selectedDate}
                                onChange={e => setSelectedDate(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-500">
                                Location
                            </label>
                            <select
                                id="location"
                                value={selectedLocation}
                                onChange={e => setSelectedLocation(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                {locations.map(loc => (
                                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="facility" className="block text-sm font-medium text-gray-100">
                                Facility
                            </label>
                            <select
                                id="facility"
                                value={selectedFacility}
                                onChange={e => setSelectedFacility(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                {facilities.map(fac => (
                                    <option key={fac.id} value={fac.id}>{fac.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <hr className="mt-4 my-4 bg-[#003366]" />
                    <div className="mt-4">
                        <span className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-300">
                                Time Slots - click on Green slots to book that time
                            </h3>
                            <button
                                type="button"
                                className="mb-1 px-3 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-1"
                                onClick={() => setInfoOpen(true)}
                            >
                                <span className="text-sm"></span>
                                <InformationCircleIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
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
                            className="px-4 py-2 rounded bg-[#FFD700] text-[#003366] font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-colors"
                            onClick={e => {
                                e.preventDefault();
                                // Add your submit logic here
                                alert("Booking submitted!");
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}