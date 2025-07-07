
import UserTable from "@/components/admin/UserTable";
import { getUsers } from "@/data/db";


export default async function AdminPage() {
    const users = await getUsers();

    return (
        <div>
            <h1>User Admin</h1>
            <UserTable users={users} />
        </div>
    );
}