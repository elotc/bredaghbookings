'use server';

import { createLocation, updateLocation, deleteLocation, getLocationById } from '@/data/dataAccessLayer';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function locationAction(prevSate: any, formData: FormData) {
  const id = Number(formData.get('locationId'));
  const name = formData.get('name') as string;
  const abbrev = formData.get('abbrev') as string;

  try {
    if (id >= 0) {
      await updateLocation(id, { name, abbrev});
    } else {
      await createLocation({ name, abbrev });
    }
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }

  revalidatePath('/admin/locations');
  redirect('/admin/locations');
}

export async function deleteLocationAction(id: number) {
  try {
    await deleteLocation(id);
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }
  revalidatePath('/admin/locations');
}

export async function duplicateLocationAction(id: number) {
  const location = await getLocationById(id)
    .then(location => {
      if (!location) throw new Error('Location not found');
      return location;
    });

  try {
    const { id: _, ...locationData } = location;
    locationData.name = 'DUPLICATE ' + locationData.name;
    locationData.abbrev = 'DUPLICATE ' + locationData.abbrev;
    await createLocation({ ...locationData });
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }
  revalidatePath('/admin/locations');

}
