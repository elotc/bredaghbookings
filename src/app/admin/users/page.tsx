"use server";

import UserTable from "@/components/admin/user/UserTable";
import { getAllOrgClubGrouping, getAllUsers, getOrgCountsPerUser } from "@/data/dataAccessLayer";


export default async function AdminPage() {
    const users = await getAllUsers();
    const userOrgCounts = await getOrgCountsPerUser();
    

    return (
        <div>
            <UserTable users={users} userOrgCounts={userOrgCounts} />
        </div>
    );
}