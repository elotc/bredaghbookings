"use server"

import { signOut } from "@/lib/auth/authConfig";

export async function handleSignOut() {
    console.log("User signed out");
    await signOut();
}
