"use client";

import { buildTimeslots } from "@/lib/schedule/scheduleUtils";
import { getEndOfWeek, getStartOfWeek } from "@/lib/schedule/dateTimeUtils";
import DailySlotsView from "@/components/admin/schedule/DailySlotsView";
import { useState } from "react";
import { StdFormInput } from "@/components/general/StdForm";
import { Schedule } from "@/data/definitions";


export default function ScheduleCalendarView({ schedule, blocks }: { schedule: Schedule, blocks: any[] }) {
  const today = new Date();

  const [startDate, setStartDate] = useState<string>(getStartOfWeek(today).toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState<string>(getEndOfWeek(today).toISOString().split("T")[0]);
  const [startHour, setStartHour] = useState<number>(18);
  const [endHour, setEndHour] = useState<number>(22);

  const timeslots = buildTimeslots(
    new Date(startDate),
    new Date(endDate),
    startHour,
    endHour,
    30,
    blocks,
    []
  );

  console.log("blocks", blocks);

  return (
    <main className="max-w-full mx-auto py-2">
      <h1 className="text-2xl font-bold mb-4">Schedule Calendar</h1>
      <form className="flex gap-4 mb-4 items-end">
        <StdFormInput
          name="start_date"
          label="Start Date"
          type="date"
          defaultValue={startDate}
          onChange={setStartDate}
        />
        <StdFormInput
          name="end_date"
          label="End Date"
          type="date"
          defaultValue={endDate}
          onChange={setEndDate}
        />
        <StdFormInput
          name="start_hour"
          label="Start Hour"
          type="number"
          defaultValue={String(startHour)}
          onChange={v => setStartHour(Number(v))}
        />
        <StdFormInput
          name="end_hour"
          label="End Hour"
          type="number"
          defaultValue={String(endHour)}
          onChange={v => setEndHour(Number(v))}
        />
      </form>
      <DailySlotsView dailySlots={timeslots} />
    </main>
  );
}