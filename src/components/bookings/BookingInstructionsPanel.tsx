export default function BookingInstructionsPanel({ showDetails, setShowDetails }: { showDetails: boolean, setShowDetails: (show: boolean) => void }) {
    return (
        <>

            <button
                type="button"
                className="text-xs font-semibold px-3 py-2 rounded border hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setShowDetails(!showDetails)}
            >
                {showDetails ? "Hide Instructions" : "Show Instructions for Updating Booking"}
            </button>
            {
                showDetails && (
                    <div className="text-sm rounded p-3 mt-2 border">
                        <p className="mb-2">You can update the booking as follows:</p>

                        <p className="font-semibold">Add A Comment</p>
                        <p className="">
                            Add a comment and click Submit. The requestor and all authorised users will be notified of the comment.
                        </p>
                        <p>
                            Click on the Approve button and then confirm your action by clicking the Submit button.
                        </p>
                        <p className="font-semibold">Approve</p>
                        <p className="">
                            Only authorised users can approve a request – no comment is needed.
                        </p>
                        <p>
                            Click on the Approve button and then confirm your action by clicking the Submit button.
                        </p>
                        <p className="font-semibold">Reject</p>
                        <p className="">
                            Only authorised users can reject a request – a comment <span className="font-bold text-red-600">IS</span> required.
                        </p>
                        <p>
                            Add a comment detailing why you are rejecting the request. Click on the Reject button. Confirm your action by clicking the Submit button.
                        </p>
                        <p className="font-semibold">Withdraw</p>
                        <p className="">
                            Only the originator of a request can withdraw it – a comment <span className="font-bold text-red-600">IS</span> required.
                        </p>
                        <p>
                            Add a comment detailing why you are withdrawing the request. Click on the Withdraw button and then confirm your action by clicking the Submit button.
                        </p>
                        
                        <div className="text-sm mt-2">
                            <p><span className="font-semibold">WARNING:</span> Withdrawing and Rejecting a request will remove all requested slots from the calendar.</p>
                            <p><span className="font-semibold">Note:</span> Authorised users have a role of Admin or Editor at the club or grouping level that the team belongs to..</p>
                        </div>

                    </div>
                )
            }
        </>
    );

}
