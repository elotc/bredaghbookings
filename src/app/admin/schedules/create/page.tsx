import ScheduleForm from "@/components/admin/schedule/ScheduleForm";
import { getSchedules } from "@/data/dataAccessLayer";

export default async function CreateSchedulePage() {
  const schedules = await getSchedules();
  return (
    <ScheduleForm schedules={schedules} />
  );
}