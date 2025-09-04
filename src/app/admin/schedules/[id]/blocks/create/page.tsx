import ScheduleBlockForm from "@/components/admin/schedule/ScheduleBlockForm";

export default async function CreateScheduleBlockPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;

  return (
    <ScheduleBlockForm 
      scheduleId={id} />
  );
}