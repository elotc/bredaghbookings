"use client";

import { DailySlots } from "@/data/definitions";
import { SlotButton } from "@/components/admin/schedule/SlotButton";
import { SelectedSlot } from "@/components/bookings/BookingContext";

export default function DailySlotsView({ dailySlots, slots, setSlots, facilityId }: 
    { 
        dailySlots: DailySlots[]; 
        slots: SelectedSlot[]; 
        setSlots: (slots: SelectedSlot[]) => void; 
        facilityId: number 
    }) {

    function handleSelect(slotId: number) {
        console.log("Slot ID:", slotId, "Facility ID:", facilityId);
        
        const existingSlot = slots.find(slot => slot.slotId === slotId && slot.facilityId === facilityId);
        
        if (existingSlot) {
            setSlots(slots.filter(slot => !(slot.slotId === slotId && slot.facilityId === facilityId)));
        } else {
            setSlots([...slots, { facilityId, slotId }]);
        }
        console.log("Selected slot:", slotId, "for facility:", facilityId);
    }

    // Convert SelectedSlot[] to number[] for compatibility with SlotButton
    const selectedSlotIds = slots
        .filter(slot => slot.facilityId === facilityId)
        .map(slot => slot.slotId);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-center">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border-b bg-gray-100 font-semibold text-xs">Slots</th>
                        {dailySlots.map((day) => (
                            <th
                                key={day.date.toString()}
                                className="px-4 py-2 border-b bg-gray-100 font-semibold text-xs"
                            >
                                {day.date.toLocaleDateString()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody
                    className="justify-center">
                    {/* Find the max number of slots in any day to determine row count */}
                    {Array.from({
                        length: Math.max(...dailySlots.map((d) => d.slots.length), 1),
                    }).map((_, rowIdx) => (
                        <tr key={rowIdx}>
                            <td className="px-4 py-2 border-b font-semibold text-xs">
                                {dailySlots[0].slots[rowIdx]
                                    ? new Date(dailySlots[0].slots[rowIdx].slotId).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                    })
                                    : "—"}
                            </td>
                            {dailySlots.map((day) => (
                                <td
                                    key={day.date.toString() + rowIdx}
                                    className="px-4 py-2 border-b align-top" 
                                >
                                    <SlotButton 
                                        slot={day.slots[rowIdx]} 
                                        selectedSlots={selectedSlotIds} 
                                        onSelect={handleSelect} 
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
