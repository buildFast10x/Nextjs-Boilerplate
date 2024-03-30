// import { NextAuthOptions, User } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import prisma from "@/lib/prisma";
// import { compare } from "bcrypt";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import configEnv from "@/config"

// import userImpl from "@/data/user/userImpl";
// import userController from "@/controllers/UserController";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Email",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//         },
//         password: {
//           label: "password",
//           type: "password",
//         },
//       },

//       async authorize(credentials) {

//         if (!credentials?.email || !credentials?.password) { 
//           return null;
//         }

//         const userControllerHandler = new userController();
//         const userDB = await userControllerHandler.getUserByEmail(credentials.email);
//         const user = new userImpl();
//         user.initFromDataObject(userDB)

//         if(!user || !user.getPassword()) {
//           return null
//         }

//         const isPasswordValid = await compare(credentials.password, user.getPassword() || '');
//         if(!isPasswordValid) {
//           return null
//         }

//         return user.toJson();
        

        

//         // if (!credentials?.email || !credentials?.password) {
//         //   return null
//         // }

//         // const user = await prisma.user.findUnique({
//         //   where: {
//         //     email: credentials.email
//         //   }
//         // })

//         // if (!user || !user.password) {
//         //   return null
//         // }
//         // const isPasswordValid = await compare(credentials.password, user.password)
//         // if (!isPasswordValid) {
//         //   return null
//         // }

//         // return {
//         //   id: String(user.id),
//         //   email: user.email,
//         //   name: user.name
//         // };
//       },
//     }),
//     GoogleProvider({
//       clientId: configEnv.google.clientId!,
//       clientSecret: configEnv.google.clientSecret!
//     })
//   ],
//   // get id in session

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.name = user.name
//         token.email = user.email
//         token.picture = user.image

//       }

//       return token;
//     },
//     async session({ token, session }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.image = token.picture;
//       }

//       return session;
//     },
//   },
// };
