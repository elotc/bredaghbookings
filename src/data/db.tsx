import { db } from '@/data/dbConn';
import { eq, gt, lt, sql } from 'drizzle-orm';
import { users as usersTable, accounts as accountsTable, sessions as sessionsTable, authenticators as authsTable, verificationTokens as tokensTable} from '@/data/bookings/schema';

export async function getUsers() {
    const users = await db.select().from(usersTable);
    // console.log('Getting all users from the database: ', users)
    return users;
}

export async function checkUserExists(email: string) {
    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (users.length > 0) {
        return true;
    } else {
        return false;
    }
}

export async function createUser(name: string, email: string) {
    const user: typeof usersTable.$inferInsert = {
        name: name,
        email: email,
        status: 'Pending',
    };
    await db.insert(usersTable).values(user);
    console.log('New user created!')
}

export async function updateUser(name: string, email: string) {
    await db
      .update(usersTable)
      .set({
        name: name,
      })
      .where(eq(usersTable.email, email));
    console.log('User info updated!')
}

export async function deleteUser(id: string) {
    await db.delete(usersTable).where(eq(usersTable.id, id));
    console.log('User deleted!')
}

export async function getAccounts() {
    const accounts = await db.select().from(accountsTable);
    console.log('Getting all accounts from the database: ', accounts)
    return accounts;
}

export async function getAuths() {
    const auths = await db.select().from(authsTable);
    console.log('Getting all auths from the database: ', auths)
    return auths;
}

export async function getSessions() {
    const sessions = await db.select().from(sessionsTable);
    console.log('Getting all sessions from the database: ', sessions)
    return sessions;
}

export async function getTokens() {
    const tokens = await db.select().from(tokensTable);
    console.log('Getting all tokens from the database: ', tokens)
    return tokens;
}

export async function deleteStaleTokens() {
    await db.delete(tokensTable).where(lt(tokensTable.expires, sql`now()`));
}
