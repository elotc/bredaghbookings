"use server";

import { deleteStaleTokens } from "@/data/db";

export async function clearStaleTokens() {
    try {
        await deleteStaleTokens();
    } catch (error) {
        throw error;
    }
}
