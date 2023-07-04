import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

interface AuthRedirect {
    baseUrl: string,
    url: string
}

export const authOptions = {
    providers: [
        CredentialsProvider(
            {name: "credentials",
            credentials: {
                username: {label: "username", type: "text", placeholder: "아이디를 입력하세요"},
                password: {label: "password", type: "password", placeholder: '비밀번호를 입력하세요'}
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                // const res = await fetch("url_path", {
                //     method: "POST",
                //     headers: {
                //         'Content-type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         username: credentials?.username,
                //         password: credentials?.password
                //     })
                
                // });

                // const user = await res.json()
                const user:any = {username: credentials?.username, password: credentials?.password}

          
                if (user) {
                  // Any object returned will be saved in `user` property of the JWT
                //   console.log(user);
                  return user
                } else {
                  // If you return null then an error will be displayed advising the user to check their details.
                  return null
          
                  // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
              },
            }
            
        ),
    ],
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        async redirect({url, baseUrl}:AuthRedirect) {
            return baseUrl
        },
        // async jwt({ token, account, profile }:any) {
        //     if (account) {
        //       token.accessToken = account.access_token 
        //       token.id = profile.id
        //     }
        //     return token 
        // },
        // async session({session, user, token}:any) {
        //     console.log('session')
        //     session.accessToken = token.accessToken
        //     return session
        // }
    }
}

export default NextAuth(authOptions)
