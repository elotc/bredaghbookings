import DemoUserSelector from "@/components/auth/DemoUserSelector";
import { getAllUsers } from "@/data/dataAccessLayer";

export default async function Page() {
    const users = await getAllUsers();
    
    return (
        <div className="w-4/5 mx-auto p-4">
            <DemoUserSelector users={users} />
        </div>
    );
}
