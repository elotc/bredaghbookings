import { users as usersTable} from '@/data/schema';

export default async function UsersList({users}: {users: typeof usersTable.$inferInsert[]}) {

    const th_normal = "px-4 py-5 font-medium";
    const td_normal = "whitespace-nowrap bg-white px-4 py-5 text-md";

    return (
        <table className="hidden min-w-full rounded-md text-gray-900 md:table">
            <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                    <th scope="col" className={th_normal}> Id </th>
                    <th scope="col" className={th_normal}> Name </th>
                    <th scope="col" className={th_normal}> Email </th>
                    <th scope="col" className={th_normal}> Email Verified </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-900">
                {users.map((u) => (
                    <tr key={u.id} className="group">
                        <td className={td_normal}>  {u.id} </td>
                        <td className={td_normal}>  {u.name} </td>
                        <td className={td_normal}>  {u.email} </td>
                        <td className={td_normal}>  {u.emailVerified?.toDateString()} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
