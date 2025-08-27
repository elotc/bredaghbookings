'use server';

import { createSchedule, updateSchedule, deleteSchedule, getScheduleById, getScheduleBlocksByScheduleId, createScheduleBlock } from '@/data/dataAccessLayer';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function scheduleAction(prevState: any, formData: FormData) {
  const id = Number(formData.get('scheduleId'));
  const name = formData.get('name') as string;

  try {
    if (id >= 0) {
      await updateSchedule(id, { name });
    } else {
      await createSchedule({ name });
    }
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }

  revalidatePath('/admin/schedules');
  redirect('/admin/schedules');
}

export async function deleteScheduleAction(id: number) {
  try {
    await deleteSchedule(id);
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }
  revalidatePath('/admin/schedules');
}

export async function duplicateScheduleAction(id: number) {
  try {
    const schedule = await getScheduleById(id)
      .then(schedule => {
        if (!schedule) throw new Error('Schedule not found');
        return schedule;
      });

    const { id: _, ...scheduleData } = schedule;
    scheduleData.name = 'DUPLICATE ' + scheduleData.name;
    const newIds = await createSchedule({ ...scheduleData });

    const blocks = await getScheduleBlocksByScheduleId(id);

    for (const block of blocks) {
      await createScheduleBlock({
        ...block,
        scheduleId: newIds[0].id,
        id: undefined,
        updatedAt: undefined,
        createdAt: undefined,
      });
    }
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }
  revalidatePath(`/admin/schedules`);
}


