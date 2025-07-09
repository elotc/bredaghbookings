"use client";

import { useState } from "react";
import Link from "next/link";

export default function UpdateBookingRequestForm({
  bookingRequest,
  bookingFacilities,
  bookingComments,
  // onUpdate,
  // onAddComment,
  // onApprove,
  // onReject,
}: {
  bookingRequest: any;
  bookingFacilities: any[];
  bookingComments: any[];
  // onUpdate: (formData: FormData) => void;
  // onAddComment: (comment: string) => void;
  // onApprove: () => void;
  // onReject: () => void;
}) {
  const [comment, setComment] = useState("");

  return (
    <form className="space-y-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Booking Request</h2>
      {/* Booking Request Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="team_id">
            Team ID
          </label>
          <input
            id="team_id"
            name="team_id"
            type="text"
            defaultValue={bookingRequest.team_id}
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
            defaultValue={bookingRequest.grouping_id}
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
            defaultValue={bookingRequest.requestor_id}
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
            defaultValue={bookingRequest.approver_id}
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
            defaultValue={bookingRequest.status}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Requested">Requested</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Withdrawn">Withdrawn</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="event_type">
            Event Type
          </label>
          <select
            id="event_type"
            name="event_type"
            defaultValue={bookingRequest.event_type}
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
            defaultValue={bookingRequest.booking_abbrev}
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
            defaultValue={bookingRequest.description}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
        </div>
      </div>

      {/* Related Booking Facilities */}
      <div>
        <h3 className="font-semibold mb-2">Related Facilities</h3>
        <table className="min-w-full bg-gray-50 rounded shadow mb-4">
          <thead>
            <tr>
              <th className="py-1 px-2 border-b text-left">Facility ID</th>
              <th className="py-1 px-2 border-b text-left">Date</th>
              <th className="py-1 px-2 border-b text-left">Start</th>
              <th className="py-1 px-2 border-b text-left">End</th>
              <th className="py-1 px-2 border-b text-left">Status</th>
              <th className="py-1 px-2 border-b text-left">Abbrev</th>
            </tr>
          </thead>
          <tbody>
            {bookingFacilities.map((fac: any) => (
              <tr key={fac.id}>
                <td className="py-1 px-2 border-b">{fac.facility_id}</td>
                <td className="py-1 px-2 border-b">{fac.date}</td>
                <td className="py-1 px-2 border-b">{fac.start_time}</td>
                <td className="py-1 px-2 border-b">{fac.end_time}</td>
                <td className="py-1 px-2 border-b">{fac.status}</td>
                <td className="py-1 px-2 border-b">{fac.abbrev}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Related Booking Comments */}
      <div>
        <h3 className="font-semibold mb-2">Comments</h3>
        <ul className="mb-2">
          {bookingComments.map((comment: any) => (
            <li key={comment.id} className="mb-1 border-b pb-1">
              <span className="font-medium">{comment.user_id}:</span> {comment.comment}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            type="button"
            className="px-4 py-2 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors"
            onClick={() => {
              if (comment.trim()) {
                setComment("");
              }
            }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
        >
          Approve
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
        >
          Reject
        </button>
        <Link
          href="/admin/booking-requests"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}