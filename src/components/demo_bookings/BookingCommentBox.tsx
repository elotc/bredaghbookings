import { useState } from "react";

type BookingCommentBoxProps = {
  comment: string;
  setComment: (value: string) => void;
};

export default function BookingCommentBox({ comment, setComment }: BookingCommentBoxProps) {
  return (
    <div>
      <label htmlFor="booking-comment" className="block text-sm font-medium text-gray-700">
        Comment (optional)
      </label>
      <textarea
        id="booking-comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
        rows={3}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        placeholder="Add any notes or requests for this booking..."
      />
    </div>
  );
}