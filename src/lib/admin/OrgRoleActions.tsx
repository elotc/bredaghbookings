'use server';

import { deleteUserOrgRole, updateUserOrgRole, createUserOrgRole, getUserByEmail, getOrgRoleByUserIdOrgId } from '@/data/dataAccessLayer';
import { RoleType } from '@/data/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function orgRoleAction(prevState: any, formData: FormData) {
    const id = Number(formData.get('orgId'));
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const userId = formData.get('userId') as string;

    try {
        if (!name || !email || !role) {
            throw new Error("Missing required fields");
        }

        if (userId === undefined || userId === null || userId === "") {
            const user = await getUserByEmail(email);
            if (!user) {
                throw new Error("This user email is not registered with the club. Contact your club admin.");
            }
            const currentRole = await getOrgRoleByUserIdOrgId(user.id, id);
            if (currentRole) {
                throw new Error("User already has a role here.");
            }
            await createUserOrgRole({ userId: user.id, orgId: id, role: role as RoleType });
        } else {
            await updateUserOrgRole({ userId, orgId: id, role: role as RoleType });
        }
    } catch (err: any) {
        return { error: err.message || "Unknown error" };
    }

    revalidatePath('/admin/orgs/' + id + '/users');
    redirect('/admin/orgs/' + id + '/users');
}

export async function deleteOrgRoleAction(id: string) {
    let ids: string[];
    try {
        ids = id.split('|');
        await deleteUserOrgRole(Number(ids[0]), ids[1], ids[2] as RoleType);
    } catch (err: any) {
        return { error: err.message || "Unknown error" };
    }
    revalidatePath('/admin/orgs/' + ids[0] + '/users');
}

