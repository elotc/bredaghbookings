'use server';

import { createFacility, updateFacility, deleteFacility, getFacilityById } from '@/data/dataAccessLayer';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function facilityAction(prevState: any, formData: FormData) {
  const id = Number(formData.get('facilityId'));
  const name = formData.get('name') as string;
  const abbrev = formData.get('abbrev') as string;
  const locationId = Number(formData.get('locationId'));
  const scheduleId = Number(formData.get('scheduleId'));
  const slotDurationMins = Number(formData.get('slotDurationMins'));
  const concurrentUseNumber = Number(formData.get('concurrentUseNumber'));

  try {
    if (!name.trim() || !abbrev.trim() || !locationId || !scheduleId) {
      throw new Error("All fields are required.");
    }
    if (id >= 0) {
      await updateFacility(id, { name, abbrev, locationId, slotDurationMins, concurrentUseNumber, scheduleId });
    } else {
      await createFacility({ name, abbrev, locationId, slotDurationMins, concurrentUseNumber, scheduleId });
    }
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }

  revalidatePath('/admin/locations/' + locationId + '/facilities');
  redirect('/admin/locations/' + locationId + '/facilities');
}

export async function deleteFacilityAction(id: number, primaryId?: number) {
  try {
    await deleteFacility(id);
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }
  revalidatePath('/admin/locations/' + primaryId + '/facilities');
}

export async function duplicateFacilityAction(id: number, primaryId?: number) {
  try {
    const facility = await getFacilityById(id)
      .then(facility => {
        if (!facility) throw new Error('Duplication Error: Facility with ID ' + id + ' not found');
        return facility;
      });

    const { id: _, ...facilityData } = facility;
    facilityData.name = 'DUPLICATE ' + facilityData.name;
    facilityData.abbrev = 'DUPLICATE ' + facilityData.abbrev;
    
    await createFacility({ ...facilityData });

  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }
  revalidatePath('/admin/locations/' + primaryId + '/facilities');
}
