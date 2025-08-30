'use server';

import { z } from 'zod';
import { createBookingRequest, updateBookingRequest, deleteBookingRequest } from '@/data/bookingDB';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAuthUserDetails } from '../auth/getAuthUserDetails';
import { log } from '../util/logging';
import { sendBookingAck } from '@/lib/emails/sendBookingUpdate';



// const UserFormSchema = z.object({
//     id: z.string(),
//     name: z.string(),
//     email: z.string().email(),
//     status: z.enum(['Active', 'Pending', 'Archived']),
// });

// const CreateUser = UserFormSchema.omit({ id: true });

export async function createBookingAction(formData: FormData) {

    let user = await getAuthUserDetails();
    if (!user || !user.name || !user.email) {
        log("User not authenticated", "error", "User authentication failed");
        throw new Error('User not authenticated');
    }

    await sendBookingAck(user.name, user.email, 'Bredagh Bookings');

    revalidatePath('/bookings/pending');
    redirect('/bookings/pending');
}

// export async function updateUserAction(id: string, formData: FormData) {
//     const name = formData.get('name');
//     const email = formData.get('email');
//     const status = formData.get('status');
//     if (typeof name !== 'string' || typeof email !== 'string' || typeof status !== 'string') {
//         throw new Error('Invalid form data');
//     }
//     if (!['Active', 'Pending', 'Archived'].includes(status)) {
//         throw new Error('Invalid status value');
//     }
//     await updateUser(id, { name, email, status: status as 'Active' | 'Pending' | 'Archived' });

//     revalidatePath('/admin/users');
//     redirect('/admin/users');
// }



// export async function deleteUserAction(id: string) {
//     await deleteUser(id);
//     log(`User with ID ${id} deleted successfully.`, 'info', `User ID: ${id}`);

//     revalidatePath('/admin/users');
// }
