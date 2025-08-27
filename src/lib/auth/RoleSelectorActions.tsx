import { redirect } from "next/navigation";

export async function roleSelectorAction(formData: FormData) {
  redirect('/home');
}
