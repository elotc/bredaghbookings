import { Card } from "@/components/dashboard/cards";
import { lusitana, roboto } from "@/components/general/fonts";
import { getAccounts, getAuths, getSessions, getTokens, getUsers } from "@/data/db";
import UsersList from "@/components/dashboard/usersList";
import { users as usersTable, accounts as accountsTable, sessions as sessionsTable, authenticators as authsTable, verificationTokens as tokensTable } from '@/data/schema';
import { redirect } from "next/navigation";
import { SignInButton } from "@/components/auth/sign-in-button";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function Dashboard() {

    let users: typeof usersTable.$inferInsert[] = await getUsers();
    let auths: typeof authsTable.$inferInsert[] = await getAuths();
    let sessions: typeof sessionsTable.$inferInsert[] = await getSessions();
    let accounts: typeof accountsTable.$inferInsert[] = await getAccounts();
    let tokens: typeof tokensTable.$inferInsert[] = await getTokens();

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            
            <UsersList users={users}></UsersList>
            <div className="pt-10 grid grid-cols-6 gap-4">
                <Card title="Users" value={users.length} type="collected" />
                <Card title="Auths" value={auths.length} type="collected" />
                <Card title="Sessions" value={sessions.length} type="collected" />
                <Card title="Accounts" value={accounts.length} type="collected" />
                <Card title="Tokens" value={tokens.length} type="collected" />
            </div>
        </main>
    );
}