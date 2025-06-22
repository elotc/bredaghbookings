"use server";

import { checkUserExists } from "@/data/db";

export async function checkUserIsRegistered(email: string) {
    try {
        return await checkUserExists(email);
    } catch (error) {
        throw error;
        return false
    }
}
