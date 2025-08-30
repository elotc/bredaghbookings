
import { DailySlots, ScheduleBlockStatus, Slot, SlotStatus, ScheduleBlock, Schedule, ScheduleFacilityBlock, FacilityBooking, BookingStatus } from "@/data/definitions";
import { getNumDays, getNumSlots, getTotalMinutesFromDate, getTotalMinutesFromTimeString, } from "@/lib/schedule/dateTimeUtils"



export function buildTimeslots(
  startDate: Date,
  endDate: Date,
  startHour: number = 0,
  endHour: number = 24,
  slotDurationMins: number,
  blocks: ScheduleFacilityBlock[],
  bookings: FacilityBooking[]
): DailySlots[] {
  if (startDate >= endDate) {
    throw new Error("Start date must be before end date");
  }
  const timeSlots: DailySlots[] = [];
  const numDays = getNumDays(startDate, endDate);
  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    const dailySlots: Slot[] = buildDailySlots(currentDate, slotDurationMins, startHour, endHour, blocks, bookings);
    timeSlots.push({ date: currentDate, slots: dailySlots });
  }
  return timeSlots;
}

export function buildDailySlots(
  date: Date,
  slotDurationMins: number,
  startHour: number = 0,
  endHour: number = 24,
  blocks: ScheduleFacilityBlock[],
  bookings: FacilityBooking[]
): Slot[] {
  const dailySlots: Slot[] = [];
  const numSlots = getNumSlots(startHour, endHour, slotDurationMins);

  for (let i = 0; i < numSlots; i++) {
    const slotStart = new Date(date);
    slotStart.setHours(startHour, 0, 0, 0);
    slotStart.setMinutes(slotStart.getMinutes() + slotDurationMins * i);

    // Check if this slot overlaps with any schedule blocks - CLOSED, AVAILABLE, ENQUIRE
    const matchingBlock = blocks.find(block => {
      const blockDayStart = new Date(block.startDate);
      const blockDayEnd = new Date(block.endDate);
      const blockTimeStartMins = getTotalMinutesFromTimeString(block.startTime);
      const blockTimeEndMins = getTotalMinutesFromTimeString(block.endTime);
      const slotStartTimeMins = getTotalMinutesFromDate(slotStart);
      return (
        slotStart >= blockDayStart &&
        slotStart <= blockDayEnd &&
        slotStartTimeMins >= blockTimeStartMins &&
        slotStartTimeMins <= blockTimeEndMins
      );
    });
    const blockStatus = matchingBlock ? matchingBlock.status : SlotStatus.ENQUIRE;

    const slot: Slot = {
      slotId: slotStart.getTime(),
      status: blockStatus === ScheduleBlockStatus.CLOSED 
        ? SlotStatus.CLOSED 
        : blockStatus === ScheduleBlockStatus.AVAILABLE 
          ? SlotStatus.AVAILABLE 
          : SlotStatus.ENQUIRE,
      teamId: -1,
      label: "",
    };
    slot.label = slot.status;

    // Check if this slot overlaps with any bookings
    const matchingBooking = bookings.find(booking => {
      const bookingDate = new Date(booking.date);
      const bookingStartTime = new Date(booking.date + " " + booking.startTime);
      const bookingEndTime = new Date(booking.date + " " + booking.endTime);
      return (
        slotStart.toDateString() === bookingDate.toDateString() &&
        slotStart >= bookingStartTime &&
        slotStart < bookingEndTime
      );
    });
    if (matchingBooking) {
      slot.status = matchingBooking.status === BookingStatus.REQUESTED 
        ? SlotStatus.REQUESTED 
        : matchingBooking.status === BookingStatus.APPROVED 
          ? SlotStatus.BOOKED 
          : SlotStatus.AVAILABLE;
      slot.teamId = matchingBooking.teamId;
      slot.label = matchingBooking.bookingRequestDescription || "Booked";
    }

    dailySlots.push(slot);
  }
  return dailySlots;
}

