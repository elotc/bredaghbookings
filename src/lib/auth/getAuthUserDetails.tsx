"use server"

import { auth } from '@/lib/auth/authConfig';

export async function getAuthUserDetails() {
    const session = await auth();
    if (session) {
        return session.user;
    } else {
        return null;
    }
}