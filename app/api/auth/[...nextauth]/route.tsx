import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Your email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials,) {
        if (!credentials || !credentials.email || !credentials.password) return null

        const user = users.find((item)=> item.email === credentials.email);
        if(user?.password ==  credentials.password){
          return user;
        } return null
      }
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }