import { BookingType } from "@/data/bookings/definitions";

type BookingTypeSelectProps = {
  selectedBookingType: BookingType;
  setSelectedBookingType: (type: BookingType) => void;
};

export default function BookingTypeSelect({
  selectedBookingType,
  setSelectedBookingType,
}: BookingTypeSelectProps) {
  return (
    <div>
      <label htmlFor="bookingType" className="block text-sm font-medium text-gray-500">
        Booking Type
      </label>
      <select
        id="bookingType"
        value={selectedBookingType}
        onChange={e => setSelectedBookingType(e.target.value as BookingType)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      >
        {Object.values(BookingType).map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
}