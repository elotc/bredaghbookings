import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from '@/data/dbConn';
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
import { clearStaleTokens } from "@/lib/auth/clearStaleTokenServerAction";
import { setUserActive } from "@/data/db";


export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    adapter: DrizzleAdapter(db),
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/auth/sign-in",
        error: "/auth/auth-error",
        verifyRequest: "/auth/auth-success",
    },
    providers: [
        Resend({from: "no-reply@tolemics.com"}),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt( {token,user} ) {
            //console.log("jwt callback", {user, token});
            if( user ) {
                await clearStaleTokens();
                if(user.email ) {
                    await setUserActive(user.email);
                }
                return {
                    ...token,
                    id: user.id, 
                };
            }
            return token;
        },
        async session({session,token}){
            //console.log("session callback", {session, token});
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string,
                },
            };
        },
    },
});
