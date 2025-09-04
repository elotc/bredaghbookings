import { getScheduleBlocksByScheduleId, getScheduleById } from "@/data/dataAccessLayer";
import { notFound } from "next/navigation";
import ScheduleBlockTable from "@/components/admin/schedule/ScheduleBlockTable";

export default async function SchedulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const schedule = await getScheduleById(Number(id));
  const blocks = await getScheduleBlocksByScheduleId(Number(id));
  if (!schedule) notFound();

  return (
    <ScheduleBlockTable 
      schedule={schedule} 
      blocks={blocks} 
    />
  );
}
