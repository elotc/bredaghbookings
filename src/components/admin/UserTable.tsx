
import { User } from "@/data/bookings/definitions";
import { CreateUser, DeleteUser, UpdateUser } from "./user/Buttons";

export default function UserTable({ users }: { users: User[] }) {

    return (
        <main className="max-w-3xl mx-auto py-8">
            <CreateUser />
            <table className="min-w-full bg-white rounded shadow">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">Email</th>
                        <th className="py-2 px-4 border-b text-left">Status</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.status}</td>
                            <td className="py-2 px-4 border-b">
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <UpdateUser id={user.id} />
                                    </div>
                                    <div className="flex-1">
                                        <DeleteUser id={user.id} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};