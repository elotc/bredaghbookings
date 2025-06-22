"use server";

import { signIn } from "@/lib/auth/authConfig";

export async function handleEmailSignin(email: string) {
  try{
    console.log("email signin");
    await signIn("resend", { email, callbackUrl: "/bookings"});
  } catch(error) {
    throw(error);
  }
}