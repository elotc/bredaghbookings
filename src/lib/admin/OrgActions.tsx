'use server';

import { insertOrg, updateOrg, deleteOrg } from '@/data/bookings/orgDb';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createOrgAction(formData: FormData) {
  const name = formData.get('name') as string;
  const abbrev = formData.get('abbrev') as string;
  const status = formData.get('status') as string;
  const type = formData.get('type') as string;

  await insertOrg({ name, abbrev, status: status as 'Active' | 'Pending' | 'Archived', type: type as 'Club' | 'Grouping' | 'Team'    });

  revalidatePath('/admin/orgs');
  redirect('/admin/orgs');
}

export async function updateOrgAction(id: number, formData: FormData) {
  const name = formData.get('name') as string;
  const abbrev = formData.get('abbrev') as string;
  const status = formData.get('status') as string;
  const type = formData.get('type') as string;

  await updateOrg(id, { name, abbrev, status: status as 'Active' | 'Pending' | 'Archived', type: type as 'Club' | 'Grouping' | 'Team' });

  revalidatePath('/admin/orgs');
  redirect('/admin/orgs');
}

export async function deleteOrgAction(id: number) {
  await deleteOrg(id);
  revalidatePath('/admin/orgs');
}