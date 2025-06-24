
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
