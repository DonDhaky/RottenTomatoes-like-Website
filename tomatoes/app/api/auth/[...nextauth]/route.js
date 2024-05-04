import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import MySQLAdapter from '../../../../lib/next-auth-mysql-adapter';
import bcrypt from "bcrypt";


export const authHandler = {
  adapter: MySQLAdapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const user = await MySQLAdapter.getUserByEmail(credentials.email);
        if (user) {
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordCorrect) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Utilisation des tokens JWT pour la session
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login', // j'envoie le process à ma page "login"
  },
};

const handler = NextAuth(authHandler);
export { handler as GET, handler as POST }