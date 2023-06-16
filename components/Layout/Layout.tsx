import { ReactNode } from 'react'
import Header from '@/components/Layout/Header/Header'
import Main from '@/components/Layout/Main/Main'
import Footer from '@/components/Layout/Footer/Footer'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({children}:LayoutProps) {
    return (
        <>
        <Header></Header>
        <Main>
            {children}
        </Main>
        <Footer></Footer>
        
        </>
        
        
    )
}