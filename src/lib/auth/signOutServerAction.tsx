"use server"

import { signOut } from "@/lib/auth/authConfig";

export async function handleSignOut() {
    await signOut();
}
