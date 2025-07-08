import { notFound } from "next/navigation";
import { getUserById, getUsers } from "@/data/db";
import UpdateUserForm from "@/components/admin/user/UpdateUserForm";

export default async function UserDetailPage({ params }: { params: { id: string } }) {
    console.log("Fetching user with ID:", params.id);
    const user = await getUserById(params.id);
    console.log("Fetched user:", user[0]);

    if (!user) {
        notFound();
    }

    return (
        <main className="max-w-lg mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Update User</h1>
            <UpdateUserForm user={user[0]} />
        </main>
    );
}