import { SlotPart, SlotStatus } from "@/data/definitions";

export function SlotButton({
    id,
    slotDetails,
    selectedSlots,
    onClick
}: {
    id: string;
    slotDetails: SlotPart
    selectedSlots: string[];
    onClick: () => void;
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

    let status = slotDetails.status;
    let btnLabel = slotDetails.displayTeamName || slotDetails.status;

    return (
        <div>
            <button
                type="button"
                onClick={onClick}
                disabled={
                    [SlotStatus.CLOSED, SlotStatus.BOOKED, SlotStatus.REQUESTED].includes(status)
                }
                className={`w-2/5 min-w-[120px] max-w-[120px] py-1 px-3 rounded border text-sm flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap
                    ${getStatusClasses(status, selectedSlots.includes(`${id}`))} ${[SlotStatus.CLOSED, SlotStatus.BOOKED, SlotStatus.REQUESTED].includes(status)
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                    }`}
                style={{ width: "120px" }}
                title={btnLabel || status}
            >
                <span
                    className="mx-auto overflow-hidden text-ellipsis whitespace-nowrap block w-full text-center"
                    style={{ direction: "rtl", textAlign: "left" }}
                >
                    {btnLabel || status}
                </span>
                {selectedSlots.includes(`${id}`) && (
                    <span className="ml-2 text-sm" aria-label="selected">✔️</span>
                )}
            </button>
        </div>
    );
}