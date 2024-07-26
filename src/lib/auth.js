import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from '../lib/db';
import { compare } from 'bcrypt';

export const authOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return {
                        message: "Email and Password are required"
                    }
                }

                const exisitingUser = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!exisitingUser) {
                    return {
                        message: "User not found",
                    };
                }
                const passwordMatch = await compare(credentials.password, exisitingUser.password);
                if (!passwordMatch) {
                    return {
                        message: "Invalid Password",
                    }
                }
                // console.log(exisitingUser);
                return {
                    id: exisitingUser.id,
                    username: exisitingUser.username,
                    email: exisitingUser.email
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser}) {
            if(user) {
                return {
                    ...token,
                    username: user.username,
                }
            }
            return token;
        },
        async session({ session, user, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                }
            }
        },
    }
};