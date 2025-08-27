"use server";

import { signIn } from "@/lib/auth/authConfig";

export async function handleEmailSignin(email: string) {
  try{
    await signIn("BredaghEmail", { email, callbackUrl: "/home"});
  } catch(error) {
    throw(error);
  }
}