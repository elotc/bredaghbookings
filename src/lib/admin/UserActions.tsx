'use server';

import { z } from 'zod';
import { createUser, updateUser, deleteUser } from '@/data/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAuthUserDetails } from '../auth/getAuthUserDetails';
import { log } from '../util/logging';
import { sendUserInvite } from '@/lib/emails/sendUserInvite';



const UserFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    status: z.enum(['Active', 'Pending', 'Archived']),
});

const CreateUser = UserFormSchema.omit({ id: true });

export async function createUserAction(formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const status = formData.get('status');

    if (typeof name !== 'string' || typeof email !== 'string' || typeof status !== 'string') {
        throw new Error('Invalid form data');
    }

    let user = await getAuthUserDetails();
    if (!user || !user.name || !user.email) {
        log("User not authenticated", "error", "User authentication failed");
        throw new Error('User not authenticated');
    }

    await createUser(name, email);

    await sendUserInvite(name, email, user.name, user.email);

    revalidatePath('/admin/users');
    redirect('/admin/users');
}

export async function updateUserAction(id: string, formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const status = formData.get('status');
    if (typeof name !== 'string' || typeof email !== 'string' || typeof status !== 'string') {
        throw new Error('Invalid form data');
    }
    if (!['Active', 'Pending', 'Archived'].includes(status)) {
        throw new Error('Invalid status value');
    }
    await updateUser(id, { name, email, status: status as 'Active' | 'Pending' | 'Archived' });

    revalidatePath('/admin/users');
    redirect('/admin/users');
}



export async function deleteUserAction(id: string) {
    await deleteUser(id);
    log(`User with ID ${id} deleted successfully.`, 'info', `User ID: ${id}`);

    revalidatePath('/admin/users');
}
