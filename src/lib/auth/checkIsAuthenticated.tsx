"use server"

import { auth } from '@/lib/auth/authConfig';

export async function checkIsAuthenticated() {
    const session = await auth();
    if (session) {
        console.log("User is authenticated:", session.user);
        return true;
    } else {
        return false;
    }
}