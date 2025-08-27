import { notFound } from "next/navigation";
import { getUserById } from "@/data/dataAccessLayer";
import UserForm from "@/components/admin/user/UserForm";

export default async function UserDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const user = await getUserById(id);

    if (!user) { notFound();}

    return (
        <main>
            <UserForm user={user} />
        </main>
    );
}