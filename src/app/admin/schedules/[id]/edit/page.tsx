import { getScheduleBlocksByScheduleId, getScheduleById } from "@/data/dataAccessLayer";
import ScheduleForm from "@/components/admin/schedule/ScheduleForm";
import { notFound } from "next/navigation";

export default async function EditSchedulePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const schedule = await getScheduleById(Number(id));
  if (!schedule) notFound();

  return (
    <ScheduleForm 
      schedule={schedule} />
  );
}