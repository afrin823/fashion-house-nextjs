import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        // name: { label: 'Name', type: 'text', placeholder: 'Enter your Name' },
        email: { 
          label: 'Email', 
          type: 'text',
          required: true,
           placeholder: 'Enter your email'
           },
        password: { 
          label: 'Password',
           type: 'password', 
           required: true,
           placeholder: 'Enter your password'
           },
      },
      async authorize(credentials) {
        if (!credentials){
          return null;
        } else{
          return true;
        }
       
      },
    }),
  ],
});

export { handler as GET, handler as POST };
