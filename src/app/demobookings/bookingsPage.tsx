'use client';

import { useState } from "react";
import { lusitana } from "@/components/general/fonts";
import StatusInfoModal from "@/components/bookings/SlotStatusInfoModal";
import { DropDownList } from "@/components/bookings/IdStringDropDown";
import { SelectDate } from "@/components/bookings/SelectDate";
import { InfoButton } from "@/components/bookings/InfoButton";
import { SlotButton } from "@/components/bookings/SlotButton";
import { useRouter } from "next/navigation";

import { Location, Facility } from "@/data/definitions";
import LocationFacilitySelect from "@/components/bookings/LocationFacilitySelect";

import { timeSlots } from "@/data/testdata";

export default function Bookings({ locations, facilities }: { locations: Location[]; facilities: Facility[] }) {
    const router = useRouter();

    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // yyyy-mm-dd
    });
    const [selectedLocation, setSelectedLocation] = useState("select");
    const [selectedFacility, setSelectedFacility] = useState("select");

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
                    <LocationFacilitySelect locations={locations} facilities={facilities} />
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
                                <SlotButton
                                    id={`${slot.id} - 1`}
                                    slotDetails={slot.part1}
                                    selectedSlots={selectedSlots}
                                    onClick={() => toggleSlot(`${slot.id} - 1`)}
                                />
                                <SlotButton
                                    id={`${slot.id} - 2`}
                                    slotDetails={slot.part2}
                                    selectedSlots={selectedSlots}
                                    onClick={() => toggleSlot(`${slot.id} - 2`)}
                                />
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
                        onClick={() => router.push("/bredagh")}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-[#FFD700] text-[#003366] font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-colors disabled:opacity-10 disabled:cursor-not-allowed"
                        disabled={selectedSlots.length === 0}
                        onClick={() => {
                            // Encode selectedSlots, selectedDate, and selectedFacility as query parameters
                            const params = new URLSearchParams();
                            params.set("slots", selectedSlots.join(","));
                            params.set("date", selectedDate);
                            params.set("facility", selectedFacility);
                            router.push(`/bookings/confirm?${params.toString()}`);
                        }}
                    >
                        Next
                    </button>
                </div>
            </form >
        </main >
    );
}