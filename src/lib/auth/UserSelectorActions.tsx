import { redirect } from "next/navigation";

export async function userSelectorAction(formData: FormData) {
  redirect('/home');
}
