import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios'
import {PATH} from '@/next.config.mjs'

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials(
            {name: "credentials",
            credentials: {
                username: {label: "username", type: "text", placeholder: "아이디를 입력하세요"},
                password: {label: "password", type: "password", placeholder: '비밀번호를 입력하세요'}
            },
            async authorize(credentials, req) {
                const body:any = {
                        username: credentials?.username,
                        password: credentials?.password
                }
                // Add logic here to look up the user from the credentials supplied
                const res:any = await axios.post(`${PATH}/login`, body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
               

                if(res.status !== 200) return null

                const user = await res.data
                // const user:any = {username: credentials?.username, password: credentials?.password}
          
                if (user) {
                  // Any object returned will be saved in `user` property of the JWT
                 
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
  });