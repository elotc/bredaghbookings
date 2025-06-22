"use server";

import { signIn } from "@/lib/auth/authConfig";

export async function handleGoogleSignin() {
  try{
    console.log("google signin");
    await signIn("google", { redirectTo: "/dashboard"});
    console.log("after google signin");
  } catch(error) {
    throw(error);
  }
}