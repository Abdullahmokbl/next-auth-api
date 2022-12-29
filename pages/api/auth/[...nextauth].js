import NextAuth from "next-auth/next";
import GoogleProvider from  'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import LinkedinProvider from 'next-auth/providers/linkedin';
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
    providers: [
        Credentials({
            id: 'Credentials',
            async authorize(credentials, req) {
                const { email, password, remember } = credentials;
                const res = await axios.post("http://localhost:3000/api/login", {email, password, remember});
                const user = await res.data;
                if (res.status && user) {
                  return user
                }
                return null
              }
          }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
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
        async jwt({ token, account, profile, user }) {
            // console.log('t')
            // console.log(user)
            // console.log(account)
            // console.log(profile)
            // console.log(token)
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
            //   token.accessToken = account.access_token
            //   token.id = user.id
                token.user = user
            }
            // console.log(token)
            return token
        },
    
        async session({ session, token, user, account, profile }) {
            // Send properties to the client, like an access_token and user id from a provider.
            // session.accessToken = token.accessToken
            // session.user.id = token.id
            session.user = token.user
            // console.log('s')
            // console.log(user)
            // console.log(token)
            // console.log(account)
            // console.log(profile)
            // console.log(session)
            return session
        }
      },
    pages: {
        signIn: '/login',
        // error: '/auth/error'
    }
})