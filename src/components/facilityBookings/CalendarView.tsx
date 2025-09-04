"use client";

import { DailySlots } from "@/data/definitions";
import { SlotButton } from "@/components/bookings/SlotButton";

export default function DailySlotsView({ dailySlots }:
    {
        dailySlots: DailySlots[];
    }) {

    return (
        <div className="overflow-x-auto">
            <div className="max-h-screen overflow-y-auto">
                <table className="min-w-full border border-gray-300 text-center">
                    <thead>
                        <tr className="">
                            <th className="px-4 py-2 border-b font-semibold text-xs">Slots</th>
                            {dailySlots.map((day) => (
                                <th
                                    key={day.date.toString()}
                                    className="px-4 py-2 border-b font-semibold text-xs"
                                >
                                    {day.date.toLocaleDateString(undefined, { weekday: "short" })} {day.date.toLocaleDateString()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="justify-center">
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
                                            selectedSlots={[]}
                                            onSelect={() => { }}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
