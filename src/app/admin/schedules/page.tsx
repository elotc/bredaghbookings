import { getSchedules } from "@/data/dataAccessLayer";
import ScheduleTable from "@/components/admin/schedule/ScheduleTable";

export default async function SchedulesPage() {
  const schedules = await getSchedules();
  return (
    <main>
      <ScheduleTable schedules={schedules} />
    </main>
  );
}