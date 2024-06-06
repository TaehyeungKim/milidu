import type { NextAuthConfig } from "next-auth"

interface AuthRedirect {
    baseUrl: string,
    url: string
}

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin'
    },
    // session: {
    //     jwt: true,
    //     maxAge: 24*60*60,
    //     updateAge: 24*60*60
    // },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        if(isLoggedIn) {
            console.log(isLoggedIn)
            return Response.redirect(new URL('/', nextUrl))
        }
        //   const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        //   if (isOnDashboard) {
        //     if (isLoggedIn) return true;
        //     return false; // Redirect unauthenticated users to login page
        //   } else if (isLoggedIn) {
        //     return Response.redirect(new URL('/dashboard', nextUrl));
        //   }
          return true;
        },
      }
    // callbacks: {

    //     async signIn({ user, account, profile, email, credentials }:any) {
    //         return true;
    //     },

    //     async redirect({url, baseUrl}:AuthRedirect) {
    //         return baseUrl
    //     },
    //     async jwt({ token, account, user  }:any) {
    //             token.name = user.name;
    //             token.sex = user.sex;
    //             token.birthday = user.birthday;
    //             token.major = user.major
    //             return token 
        
    //     },
    //     async session({session, user, token}:any) {
           
    //             session.user.name = token.name;
    //             session.user.major = token.major;
    //             session.user.sex = token.sex;
    //             session.user.birthday = token.birthday
    //             return session
            
            
    //     }
    // }
    ,
    providers: []
} satisfies NextAuthConfig
