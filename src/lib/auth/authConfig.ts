import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from '@/data/dbConn';
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
import { clearStaleTokens } from "@/lib/auth/clearStaleTokenServerAction";
import { setUserActiveByEmail } from "@/data/dataAccessLayer";
import { sendVerificationRequest } from "@/lib/emails/sendVerificationRequest";


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
        {
            id: "BredaghEmail",
            name: "Email",
            type: "email",
            maxAge: 60 * 60 * 24, // Email link will expire in 24 hours
            sendVerificationRequest,
        },
        Resend(
            {
                from: "Bredagh <onboarding@bredagh.tolemics.com>",
                apiKey: process.env.RESEND_API_KEY
            }
        ),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                console.log("JWT callback triggered for user:", user.email);
                await clearStaleTokens();
                if (user.email) {
                    await setUserActiveByEmail(user.email);
                }
                return {
                    ...token,
                    id: user.id,
                };
            }
            return token;
        },
        async session({ session, token }) {
            console.log("Session callback triggered for user:", session.user.email);
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
