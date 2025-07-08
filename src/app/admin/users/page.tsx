"use server";

import UserTable from "@/components/admin/UserTable";
import { getUsers } from "@/data/db";


export default async function AdminPage() {
    const users = await getUsers();

    return (
        <div>
            <h2>User Admin</h2>
            <UserTable users={users} />
        </div>
    );
}