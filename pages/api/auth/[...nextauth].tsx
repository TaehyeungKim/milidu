import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import {User} from '@/Interface/interface'
import axios from 'axios'

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
                const body = {
                        username: credentials?.username,
                        password: credentials?.password
                }
                // Add logic here to look up the user from the credentials supplied
                const res = await axios.post("https://milidu-backend-ykzlu.run.goorm.site/login", body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res)

                if(res.status !== 200) return null

                const user = await res.data
                // const user:any = {username: credentials?.username, password: credentials?.password}
          
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
        //     session.accessToken = token.accessToken
        //     return session
        // }
    }
}

export default NextAuth(authOptions)
