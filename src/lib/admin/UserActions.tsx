'use server';

import { createUser, updateUser, deleteUser } from '@/data/dataAccessLayer';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAuthUserDetails } from '@/lib/auth/getAuthUserDetails';
import { log } from '@/lib/util/logging';
import { sendUserInvite } from '@/lib/emails/sendUserInvite';


export async function userAction(prevState: {error: string}, formData: FormData) {
    const id = formData.get('userId') as string;
    const name = formData.get('name');
    const email = formData.get('email');
    const status = formData.get('status');

    console.log("User Action - ID:", id, "Name:", name, "Email:", email, "Status:", status);

    try {
        if (typeof name !== 'string' || typeof email !== 'string' || typeof status !== 'string') {
            throw new Error('Invalid form data');
        }

        const user = await getAuthUserDetails();
        if (!user || !user.name || !user.email) {
            log("User not authenticated", "error", "User authentication failed");
            throw new Error('User not authenticated');
        }

        if (id && id !== 'unset') {
            await updateUser(id, { name, email, status: status as 'Active' | 'Pending' | 'Archived' });
        } else {
            await createUser(name, email);
            await sendUserInvite(name, email, user.name, user.email);
        }
    } catch (err: any) {
        return { error: err.message || "Unknown error" };
    }

    revalidatePath('/admin/users');
    redirect('/admin/users');
}

export async function deleteUserAction(id: string) {
    try {
        await deleteUser(id);
    } catch (err: any) {
        return { error: err.message || "Unknown error" };
    }
    revalidatePath('/admin/users');
}


