
import CreateUserForm from "@/components/admin/user/CreateUserForm";
import { getUserEmails } from "@/data/db";


export default async function CreateUserPage() {
    let userEmails = await getUserEmails();
    const emailList = userEmails
        .map(u => u.email)
        .filter((email): email is string => email !== null);
    return (
        <CreateUserForm emails={emailList} />
    );
}