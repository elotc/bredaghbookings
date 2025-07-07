'use server';

import { z } from 'zod';
import { createUser, updateUser, deleteUser } from '@/data/db';
import { User } from '@/data/bookings/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

    await createUser(name, email);
    revalidatePath('/admin/users');
    redirect('/admin/users');
}

export async function updateUserAction(id: string, formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
     if (typeof name !== 'string' || typeof email !== 'string') {
        throw new Error('Invalid form data');
    }
    await updateUser(name, email);
    revalidatePath('/admin/users');
    redirect('/admin/users');
}

export async function deleteUserAction(id: string) {
    await deleteUser(id);
    revalidatePath('/admin/users');
    redirect('/admin/users');
} 

