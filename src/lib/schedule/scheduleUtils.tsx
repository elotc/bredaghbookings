
import { DailySlots, ScheduleBlockStatus, Slot, SlotStatus, ScheduleBlock, Schedule, ScheduleFacilityBlock, FacilityBooking } from "@/data/definitions";
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
  // console.log("Building timeslots from", startDate, "to", endDate, "with hours", startHour, "to", endHour, "and slot duration", slotDurationMins, "mins");
  // console.log("Blocks:", blocks);
  // console.log("Bookings:", bookings);
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
      status: blockStatus === ScheduleBlockStatus.CLOSED ?
        SlotStatus.CLOSED : blockStatus === ScheduleBlockStatus.AVAILABLE ?
          SlotStatus.AVAILABLE : SlotStatus.ENQUIRE,
      teamId: -1,
      label: "",
    };
    slot.label = slot.status;
    dailySlots.push(slot);
  }
  return dailySlots;
}

