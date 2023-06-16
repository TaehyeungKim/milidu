import Layout from "@/components/Layout/Layout";
import { AppProps} from "next/app";
import './style.css'

export default function App({Component, pageProps}: AppProps) {
    return(
        <Layout>
            <Component {...pageProps}/>
        </Layout>
    )
}