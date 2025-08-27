import { getScheduleBlockById } from "@/data/dataAccessLayer";
import { notFound } from "next/navigation";
import ScheduleBlockForm from "@/components/admin/schedule/ScheduleBlockForm";
import { ScheduleBlock } from "@/data/definitions";

export default async function EditScheduleBlockPage({ params }: { params: { id: number, blockId: number } }) {
  const { id, blockId } = await params;
  const block: ScheduleBlock | null = await getScheduleBlockById(Number(blockId));
  if (!block) notFound();

  return (
    <ScheduleBlockForm
      scheduleId={id}
      scheduleBlock={block}
    />
  );
}