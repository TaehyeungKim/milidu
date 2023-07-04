import Layout from "@/components/Layout/Layout";
import { AppProps} from "next/app";
import './style.css'
import { SessionProvider } from "next-auth/react";

export default function App({Component, pageProps:{session, ...pageProps}}: AppProps) {
    return(
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </SessionProvider>
    )
}