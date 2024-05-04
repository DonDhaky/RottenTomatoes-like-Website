import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import MySQLAdapter from '../../../../lib/next-auth-mysql-adapter';
import bcrypt from "bcrypt";


const authHandler = NextAuth({
  adapter: MySQLAdapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await MySQLAdapter.getUserByEmail(credentials.email);
        console.log(user, credentials); //TEST
        if (user) {
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          console.log(isPasswordCorrect); //TEST
          if (isPasswordCorrect) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login', // j'envoie le process à ma page "login"
  },
});

export const POST = authHandler;

export const GET = async (req) => {
  try {
    // Renvoyer des informations sur les fournisseurs disponibles
    const providers = ["Credentials"];
    return new Response(JSON.stringify({ providers }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
};