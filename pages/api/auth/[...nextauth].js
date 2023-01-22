import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedinProvider from "next-auth/providers/linkedin";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

// const GOOGLE_AUTHORIZATION_URL =
//   "https://accounts.google.com/o/oauth2/v2/auth?" +
//   new URLSearchParams({
//     prompt: "consent",
//     access_type: "offline",
//     response_type: "code",
//   })
// async function refreshAccessToken(token) {
//   try {
//     const res = await axios.post(process.env.NEXT_PUBLIC_API+"/token",token.refreshToken);
//     const data = await res.json();
//     return {
//       ...token,
//       accessToken: data.accessToken,
//       accessTokenExpires: Date.now() + account.expires_at * 1000,
//       refreshToken: data.refreshToken ?? data.refreshToken
//     };
//   } catch (error) {
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

export default NextAuth({
  providers: [
    Credentials({
      id: "Credentials",
      async authorize(credentials, req) {
        const { email, password, remember } = credentials;
        const res = await axios.post(process.env.NEXT_PUBLIC_API + "/login", {
          email,
          password,
          remember,
        });
        const user = await res.data;
        if (res.status && user) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // FacebookProvider({
    //     clientId: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // LinkedinProvider({
    //     clientId: process.env.LINKEDIN_ID,
    //     clientSecret: process.env.LINKEDIN_SECRET
    // })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  //   session: { strategy: "jwt" },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 2,
    // You can define your own encode/decode functions for signing and encryption
    // async encode() {},
    // async decode() {},
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //     // if(account.provider === 'Credentials'){
    //     //     console.log('rew')
    //     //     return user
    //     // }
    //     // console.log(user)
    //     return true;
    // },
    // async redirect({ url, baseUrl }) {
    //     // Allows relative callback URLs
    //     if (url.startsWith("/")) return `${baseUrl}${url}`
    //     // Allows callback URLs on the same origin
    //     else if (new URL(url).origin === baseUrl) return url
    //     return baseUrl
    // },
    async jwt({ token, user, account }) {
      // console.log(account.providerAccountId)
      // console.log(account);
      // console.log(token);
      // console.log(user);
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        // token.accessToken = account.access_token;
        // token.accessTokenExpires = Date.now() + account.expires_at * 1000;
        // token.refreshToken = account.refresh_token;

        //   token.accessToken = account.access_token
        //   token.id = user.id
        token.user = user;
        token.isAdmin = user.isAdmin;
      }
      //   if (Date.now() > token.accessTokenExpires) {
      //     return await refreshAccessToken(token);
      //   }
      return token;
    },

    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken
      // session.user.id = token.id;
      // session.user = token.user;
      session.user.id = token.user.id;
      session.user.email = token.user.email;
      session.user.name = token.user.name;
      session.user.cart = token.user.cart;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    // error: '/auth/error'
  },
});
