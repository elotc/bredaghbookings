'use server';

import { createScheduleBlock, updateScheduleBlock, deleteScheduleBlock, getScheduleBlockById } from '@/data/dataAccessLayer';
import { ScheduleBlockStatus } from '@/data/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function scheduleBlockAction(prevState: any, formData: FormData) {
  const id = Number(formData.get('scheduleBlockId'));
  const scheduleId = Number(formData.get('schedule_id'));
  const startDate = formData.get('start_date') as string;
  const endDate = formData.get('end_date') as string;
  const startTime = formData.get('start_time') as string;
  const endTime = formData.get('end_time') as string;
  const status = formData.get('status') as string;

  try {
    if (id >= 0) {
      await updateScheduleBlock(id, {
        scheduleId,
        startDate,
        endDate,
        startTime,
        endTime,
        status: status as ScheduleBlockStatus,
      });
    } else {
      await createScheduleBlock({
        scheduleId,
        startDate,
        endDate,
        startTime,
        endTime,
        status: status as ScheduleBlockStatus,
      });
    }
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }

  revalidatePath(`/admin/schedules/${scheduleId}/blocks`);
  redirect(`/admin/schedules/${scheduleId}/blocks`);
}

export async function deleteScheduleBlockAction(id: number, primaryId?: number) {
  try {
    await deleteScheduleBlock(id);
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }
  revalidatePath(`/admin/schedules/${primaryId}/blocks`);
}

export async function duplicateScheduleBlockAction(id: number, primaryId?: number) {
  try {
    const block = await getScheduleBlockById(id)
      .then(block => {
        if (!block) throw new Error('Block not found');
        return block;
      });

    await createScheduleBlock({ 
      ...block, 
      id: undefined, 
      status: block.status as ScheduleBlockStatus 
    });
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }
  revalidatePath(`/admin/schedules/${primaryId}/blocks`);
}