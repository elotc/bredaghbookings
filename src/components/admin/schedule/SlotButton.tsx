import { Slot, SlotStatus } from "@/data/definitions";

export function SlotButton({
    slot,
    selectedSlots,
    onSelect
}: {
    slot: Slot;
    selectedSlots: number[];
    onSelect: (slotId: number) => void;
}) {
    function getStatusClasses(status: SlotStatus, selected: boolean) {
        if (selected) return "border-2 border-black"; // highlight selected
        switch (status) {
            case SlotStatus.AVAILABLE:
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

    let btnLabel = slot.label || slot.status;

    return (
        <div>
            <button
                type="button"
                onClick={onSelect.bind(null, slot.slotId)}
                disabled={
                    [SlotStatus.CLOSED, SlotStatus.BOOKED, SlotStatus.REQUESTED].includes(slot.status)
                }
                className={`block w-full py-1 px-3 rounded border text-sm flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap
                    ${getStatusClasses(slot.status, selectedSlots.includes(slot.slotId))} 
                    ${[SlotStatus.CLOSED, SlotStatus.BOOKED, SlotStatus.REQUESTED].includes(slot.status)
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                title={slot.status}
            >
                {selectedSlots.includes(slot.slotId) ? (
                    <span className="ml-2 text-sm text-center" aria-label="selected">✔️</span>
                ) : (
                    <span
                        className="mx-auto overflow-hidden text-ellipsis whitespace-nowrap block w-full text-center"
                    >
                        {btnLabel}
                    </span>
                )}
            </button>
        </div>
    );
}