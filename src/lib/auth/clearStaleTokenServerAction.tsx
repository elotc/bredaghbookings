"use server";

import { deleteStaleTokens } from "@/data/dataAccessLayer";

export async function clearStaleTokens() {
    try {
        await deleteStaleTokens();
    } catch (error) {
        throw error;
    }
}
