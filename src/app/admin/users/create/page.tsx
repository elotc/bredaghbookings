
import UserForm from "@/components/admin/user/UserForm";
import { getAllUserEmails } from "@/data/dataAccessLayer";


export default async function CreateUserPage() {
    let userEmails = await getAllUserEmails();
    const emailList = userEmails
        .map(u => u.email)
        .filter((email): email is string => email !== null);
    
    return (
        <UserForm emails={emailList} />
    );
}