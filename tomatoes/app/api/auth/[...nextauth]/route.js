import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import MySQLAdapter from '../../../../lib/next-auth-mysql-adapter';
import bcrypt from "bcrypt";


export default NextAuth({
  adapter: MySQLAdapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await MySQLAdapter.getUserByEmail(credentials.email);
        if (user) {
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});