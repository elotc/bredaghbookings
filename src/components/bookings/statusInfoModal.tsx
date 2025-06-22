export default function StatusInfoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">Slot Status Colors</h2>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        <span className="inline-block w-1/12 w-4 h-4 rounded bg-green-500 border border-green-600 mr-2"></span>
                        <span className="w-3/12 font-medium">Free</span>
                        <span className="w-8/12">Available to book</span>
                    </li>
                    <li className="flex items-center">
                        <span className="inline-block w-1/12 w-4 h-4 rounded bg-green-200 border border-green-300 mr-2"></span>
                        <span className="w-3/12 font-medium">Enquire</span>
                        <span className="w-8/12">An enquiry can be made to the facility owner to see if there is availability</span>
                    </li>
                    <li className="flex items-center">
                        <span className="inline-block w-1/12 w-4 h-4 rounded bg-yellow-300 border border-yellow-400 mr-2"></span>
                        <span className="w-3/12 font-medium">Requested</span>
                        <span className="w-8/12">A booking requested has already been submitted for this slot and is pending approval</span>
                    </li>
                    <li className="flex items-center">
                        <span className="inline-block w-1/12 w-4 h-4 rounded bg-red-500 border border-red-600 mr-2"></span>
                        <span className="w-3/12 font-medium">Booked</span>
                        <span className="w-8/12">This slot has already been booked</span>
                    </li>
                    <li className="flex items-center">
                        <span className="inline-block w-1/12 w-4 h-4 rounded bg-gray-700 border border-gray-800 mr-2"></span>
                        <span className="w-3/12 font-medium">Closed</span>
                        <span className="w-8/12">The facility is closed and not available for booking</span>
                    </li>
                </ul>
                <button
                    className="mt-6 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 w-full"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}