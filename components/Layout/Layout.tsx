import { ReactNode } from 'react'
import Header from '@/components/Layout/Header/Header'
import Main from '@/components/Layout/Main/Main'
import Footer from '@/components/Layout/Footer/Footer'
import {useRouter} from 'next/router'
import styles from './Layout.module.scss';

interface LayoutProps {
    children: ReactNode
}

export default function Layout({children}:LayoutProps) {

    const router = useRouter();



    return (
        <div className = {styles.layout}>
        {router.pathname !== '/signin' && router.pathname !== '/signup' ? <Header></Header> : null}
        <Main>
            {children}
        </Main>
        <Footer></Footer>
        </div>
        
        
    )
}