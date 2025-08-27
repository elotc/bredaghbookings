"use server";

import { checkUserEmailExists } from "@/data/dataAccessLayer";

export async function checkUserIsRegistered(email: string) {
    try {
        return await checkUserEmailExists(email);
    } catch (error) {
        throw error;
        return false
    }
}
