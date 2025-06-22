import { SlotStatus } from "@/app/bookings/bookingsPage";
import { InformationCircleIcon } from "@heroicons/react/16/solid";

export function InfoButton({
    onClick
}: {
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="mb-1 px-1 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-1"
        >
            <InformationCircleIcon className="w-5 h-5" aria-hidden="true" />
        </button>
    );
}

export function SlotButton({
    id,
    status,
    btnLabel,
    selectedSlots,
    onClick
}: {
    id: string;
    status: SlotStatus;
    btnLabel: string;
    selectedSlots: string[];
    onClick: () => void;
}) {
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

    return (
        <div>
            <button
                type="button"
                onClick={onClick}
                disabled={
                    [SlotStatus.CLOSED, SlotStatus.BOOKED, SlotStatus.REQUESTED].includes(status)
                }
                className={`w-2/5 min-w-[120px] py-1 px-3 rounded border text-sm flex items-center justify-center 
                    ${getStatusClasses(status, selectedSlots.includes(`${id}`))} ${[SlotStatus.CLOSED, SlotStatus.BOOKED, SlotStatus.REQUESTED].includes(status)
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                    }`}
            >
                <span className="mx-auto">{btnLabel || status}</span>
                {selectedSlots.includes(`${id}`) && (
                    <span className="ml-2 text-sm" aria-label="selected">✔️</span>
                )}
            </button>
        </div>
    );
}


