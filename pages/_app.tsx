import Layout from "@/components/Layout/Layout";
import { AppProps} from "next/app";
import './style.css'
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";





export default function App({Component, pageProps:{session, ...pageProps}}: AppProps) {

    

    useEffect(()=>{
        const browserSession = sessionStorage;
        browserSession.certPageIndex = 0;
    },[])

    return(
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </SessionProvider>
    )
}