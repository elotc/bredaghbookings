"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateBookingRequestForm({ onSubmit }: { onSubmit: (data: any) => void }) {
    const router = useRouter();

    // Booking request fields
    const [teamId, setTeamId] = useState("");
    const [groupingId, setGroupingId] = useState("");
    const [requestorId, setRequestorId] = useState("");
    const [approverId, setApproverId] = useState("");
    const [status, setStatus] = useState("Requested");
    const [seasonId, setSeasonId] = useState("");
    const [eventType, setEventType] = useState("Training");
    const [bookingAbbrev, setBookingAbbrev] = useState("");
    const [description, setDescription] = useState("");

    // Booking facility rows
    const [facilities, setFacilities] = useState<any[]>([]);
    const [facility, setFacility] = useState({
        facility_id: "",
        date: "",
        start_time: "",
        end_time: "",
        status: "Active",
        abbrev: "",
    });

    // Booking comment
    const [comment, setComment] = useState("");

    function handleAddFacility() {
        if (
            facility.facility_id &&
            facility.date &&
            facility.start_time &&
            facility.end_time
        ) {
            setFacilities([...facilities, facility]);
            setFacility({
                facility_id: "",
                date: "",
                start_time: "",
                end_time: "",
                status: "Active",
                abbrev: "",
            });
        }
    }

    function handleRemoveFacility(idx: number) {
        setFacilities(facilities.filter((_, i) => i !== idx));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit({
            team_id: teamId,
            grouping_id: groupingId,
            requestor_id: requestorId,
            approver_id: approverId,
            status,
            season_id: seasonId,
            event_type: eventType,
            booking_abbrev: bookingAbbrev,
            description,
            facilities,
            comment,
        });
    }

    return (
        <main className="max-w-2xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Create Booking Request</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="team_id">
                            Team ID
                        </label>
                        <input
                            id="team_id"
                            name="team_id"
                            type="text"
                            value={teamId}
                            onChange={e => setTeamId(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="grouping_id">
                            Grouping ID
                        </label>
                        <input
                            id="grouping_id"
                            name="grouping_id"
                            type="text"
                            value={groupingId}
                            onChange={e => setGroupingId(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="requestor_id">
                            Requestor ID
                        </label>
                        <input
                            id="requestor_id"
                            name="requestor_id"
                            type="text"
                            value={requestorId}
                            onChange={e => setRequestorId(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="approver_id">
                            Approver ID
                        </label>
                        <input
                            id="approver_id"
                            name="approver_id"
                            type="text"
                            value={approverId}
                            onChange={e => setApproverId(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="status">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="Requested">Requested</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Withdrawn">Withdrawn</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="season_id">
                            Season ID
                        </label>
                        <input
                            id="season_id"
                            name="season_id"
                            type="text"
                            value={seasonId}
                            onChange={e => setSeasonId(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="event_type">
                            Event Type
                        </label>
                        <select
                            id="event_type"
                            name="event_type"
                            value={eventType}
                            onChange={e => setEventType(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="Training">Training</option>
                            <option value="Match">Match</option>
                            <option value="Event">Event</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="booking_abbrev">
                            Abbrev
                        </label>
                        <input
                            id="booking_abbrev"
                            name="booking_abbrev"
                            type="text"
                            value={bookingAbbrev}
                            onChange={e => setBookingAbbrev(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            rows={2}
                        />
                    </div>
                </div>

                {/* Booking Facility Rows */}
                <div>
                    <h3 className="font-semibold mb-2">Facilities</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Facility ID"
                            value={facility.facility_id}
                            onChange={e => setFacility(f => ({ ...f, facility_id: e.target.value }))}
                            className="border rounded px-2 py-1"
                        />
                        <input
                            type="text"
                            placeholder="Date"
                            value={facility.date}
                            onChange={e => setFacility(f => ({ ...f, date: e.target.value }))}
                            className="border rounded px-2 py-1"
                        />
                        <input
                            type="text"
                            placeholder="Start Time"
                            value={facility.start_time}
                            onChange={e => setFacility(f => ({ ...f, start_time: e.target.value }))}
                            className="border rounded px-2 py-1"
                        />
                        <input
                            type="text"
                            placeholder="End Time"
                            value={facility.end_time}
                            onChange={e => setFacility(f => ({ ...f, end_time: e.target.value }))}
                            className="border rounded px-2 py-1"
                        />
                        <select
                            value={facility.status}
                            onChange={e => setFacility(f => ({ ...f, status: e.target.value }))}
                            className="border rounded px-2 py-1"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Abbrev"
                            value={facility.abbrev}
                            onChange={e => setFacility(f => ({ ...f, abbrev: e.target.value }))}
                            className="border rounded px-2 py-1"
                        />
                        <button
                            type="button"
                            className="px-3 py-1 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors"
                            onClick={handleAddFacility}
                        >
                            Add Facility
                        </button>
                    </div>
                    <ul>
                        {facilities.map((f, idx) => (
                            <li key={idx} className="flex gap-2 items-center mb-1">
                                <span>{f.facility_id} | {f.date} | {f.start_time}-{f.end_time} | {f.status} | {f.abbrev}</span>
                                <button
                                    type="button"
                                    className="text-red-600 hover:underline ml-2"
                                    onClick={() => handleRemoveFacility(idx)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Booking Comment */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="comment">
                        Add Comment
                    </label>
                    <input
                        id="comment"
                        name="comment"
                        type="text"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter a comment..."
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                        onClick={() => router.push("/bookings/pending")}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors"
                        disabled={!teamId || !requestorId}
                    >
                        Create Booking Request
                    </button>
                </div>
            </form>
        </main>
    );
}