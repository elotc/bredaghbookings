import { getScheduleById, getSchedules } from "@/data/dataAccessLayer";
import ScheduleForm from "@/components/admin/schedule/ScheduleForm";
import { notFound } from "next/navigation";

export default async function EditSchedulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const schedule = await getScheduleById(Number(id));
  const schedules = await getSchedules();
  if (!schedule) notFound();

  return (
    <ScheduleForm
      schedules={schedules}
      schedule={schedule} />
  );
}