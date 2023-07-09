import Layout from "@/components/Layout/Layout";
import { AppProps} from "next/app";
import './style.css'
import { createContext, useEffect, useState} from "react";

import { User } from "@/Interface/interface";

import { useRouter } from "next/router";



export const PrevRouteContext = createContext('/')
export const CurRouteContext = createContext('/')

export const UserContext = createContext<UserContext|null>(null)

type UserContext = {
    user: User|null
    dispatch: (user: User|null) => void;
}


export default function App({Component, pageProps:{session, ...pageProps}}: AppProps) {

    const [routeChanging, setRouteChanging] = useState<boolean>(false);
    const [prevRoute, setPrevRoute] = useState<string>('/')
    const [curRoute, setCurRoute] = useState<string>('/')

    const [user, setUser] = useState<User|null>(null);


    const router = useRouter();

    useEffect(()=>{
        const changingOn = () => {
             setRouteChanging(true);
             setPrevRoute(router.route)
    }
        const changingOff = () => {
            setRouteChanging(false);
        }
        
        router.events.on('routeChangeStart', changingOn)
        router.events.on('routeChangeComplete', changingOff)


        return(()=>{
            router.events.off('routeChangeStart', changingOn);
            router.events.off('routeChangeComplete', changingOff)
        })


        

    },[router])

    useEffect(()=>{
        const browserSession = sessionStorage;
        browserSession.certPageIndex = 0;
    },[])

    return(

            <UserContext.Provider value={{
                user: user,
                dispatch: setUser
            }}>
            <CurRouteContext.Provider value={curRoute}>
            <PrevRouteContext.Provider value={prevRoute}>
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
            </PrevRouteContext.Provider>
            </CurRouteContext.Provider>
            </UserContext.Provider>


    )
}
