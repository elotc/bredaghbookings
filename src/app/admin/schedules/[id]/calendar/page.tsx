import ScheduleCalendarView from "@/components/admin/schedule/ScheduleCalendar";
import { getScheduleBlocksByScheduleId, getScheduleById } from "@/data/dataAccessLayer";
import { notFound } from "next/navigation";

export default async function CalendarSchedulePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const schedule = await getScheduleById(Number(id));
  const blocks = await getScheduleBlocksByScheduleId(Number(id));
  if (!schedule) notFound();

  return (
    <ScheduleCalendarView 
      schedule={schedule} 
      blocks={blocks} 
    />
  );
}